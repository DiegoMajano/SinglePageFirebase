import { getDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import db from '../firebase/appConfig';
import { useForm } from 'react-hook-form';



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

            navigate("/productos")
        } catch (error) {
            console.error('Error al actualizar el producto', error)
        }

    }

  return (
    <div>
      <h2>Registro de productos</h2>
      <form action="" onSubmit={handleSubmit(editProduct)}>
        <div>
          <label htmlFor="">Editar Producto</label>
          <input type="text"{...register('name')}/>
        </div>

        <div>
          <label htmlFor="">Descripción</label>
          <input type="text" {...register('description')} />
        </div>

        <div>
          <button type='submit'>Guardar Producto</button>
        </div>
      </form>
    </div>
  )
}
