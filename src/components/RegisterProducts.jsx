import React from 'react'
import { useForm } from 'react-hook-form'
import { collection, addDoc  } from 'firebase/firestore'
import db from '../firebase/appConfig'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function RegisterProducts() {

  /**
   * register = hace referencia a lo que capturo en la entrada de dato
   * watch = permite observar alguna entrada de dato (valor)
   * handleSubmit = es la accion de lo que voy hacer con la informacion
   */

  // creando constante para redirigir a una ruta
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: {errors}} = useForm()

  const saveProduct = async (data) => {7
    console.log('se ha guardado');
    console.log(data);
    
    try {
      await addDoc(collection(db, "products"), {
        name: data.name,
        description: data.description
      })

      Swal.fire({
        title: "Producto editado",
        text: "Se ha editado correctamente el producto",
        icon: "success"
      });
    } catch (error) {
      console.error("Error al registrar el producto ", error)
    }

    // redireccionamos a la lista de productos
    navigate("/productos");
  }

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 text-center">

              <h3 className="mb-5">Registro de productos</h3>

              <form onSubmit={handleSubmit(saveProduct)}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="name">Ingresar Producto</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control form-control-lg"
                    placeholder="Nombre del producto"
                    {...register("name")}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="description">Descripción</label>
                  <input
                    type="text"
                    id="description"
                    className="form-control form-control-lg"
                    placeholder="Descripción del producto"
                    {...register("description")}
                  />
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit">Guardar Producto</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
