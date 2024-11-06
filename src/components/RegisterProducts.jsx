import React from 'react'
import { useForm } from 'react-hook-form'
import { collection, addDoc  } from 'firebase/firestore'
import db from '../firebase/appConfig'
import { useNavigate } from 'react-router-dom'

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
    } catch (error) {
      console.error("Error al registrar el producto ", error)
    }

    // redireccionamos a la lista de productos
    navigate("/productos");
  }

  return (
    <div>
      <h2>Registro de productos</h2>
      <form action="" onSubmit={handleSubmit(saveProduct)}>
        <div>
          <label htmlFor="">Ingresar Producto</label>
          <input type="text"{...register('name')}/>
        </div>

        <div>
          <label htmlFor="">Descripcio</label>
          <input type="text" {...register('description')} />
        </div>

        <div>
          <button type='submit'>Guardar Producto</button>
        </div>
      </form>
    </div>
  )
}
