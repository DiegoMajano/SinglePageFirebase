import { getDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import db from '../firebase/appConfig';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';



export default function EditForm() {
    
    const navigate = useNavigate();

    const { register, handleSubmit, setValue,formState: {errors} } = useForm();
    
    const { id } = useParams();

    // montando el producto seleccionado

    useEffect(()=>{
        
        const getProductById = async () => {
            const productDoc = await getDoc(doc(db, "products", id))

            if(productDoc.exists()){
                const productData = productDoc.data()
                console.log(productData);

                // mandar info al form

                setValue('name', productData.name);
                setValue('description', productData.description)


            } else{
                console.log("No existe el producto");                
            }
        }


        getProductById()

    }, [])

    const editProduct = async (data) => {

        try {
            await updateDoc(doc(db, "products", id), {
                name: data.name,
                description: data.description
            })
            Swal.fire({
              title: "Producto editado",
              text: "Se ha editado correctamente el producto",
              icon: "success"
            });

            navigate("/productos")
        } catch (error) {
            console.error('Error al actualizar el producto', error)
        }

    }

  return (

    <>     

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Editar productos</h3>

                <form onSubmit={handleSubmit(editProduct)}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">Editar Producto</label>
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

    </>
  )
}
