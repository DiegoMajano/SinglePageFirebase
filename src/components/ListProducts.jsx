import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, onSnapshot, doc  } from 'firebase/firestore'
import db from '../firebase/appConfig'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function ListProducts() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    // funcion que permite visualiar info de db
    onSnapshot(
      // obtiene nombre de la db y de la coleccion
      collection(db, "products") ,
      (snapshot) => {
        // testeando el primer documento
        console.log(snapshot.docs[0].data());
        /**
         * iterado los docs de la coleccion
         */

        const array_products = snapshot.docs.map((doc) => {
          // copiar elementos de cada coleccion
          return {...doc.data(), id: doc.id}
        })

        console.log(array_products);
        

        // actualizamos estado con arreglo de productos

        setProducts(array_products)

        
      }
    )
  }, []);

  const deleteProduct = (id) => {

    try {
      Swal.fire({
        title: "¿Estás seguro de eliminar el producto?",
        text: "No podrás recuperar la información!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          // eliminar el documento
          deleteDoc(doc(db, "products", id))
          
          Swal.fire({          
            title: "Eliminado!",
            text: "El producto ha sido eliminado.",
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.error('Error al eliminar el producto', error)
    }
  }



  return (
    <div>
      <h1>Lista de productos</h1>
      <div>
        {
          products.length > 0 ?
          products.map((product) => {
            return (
              <div key={product.id}>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <Link to={`/editar/${product.id}`}>Editar</Link>
                  <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                </div>
              </div>
            )
          }) : <p>No hay productos</p>
        } 
      </div>
    </div>
  )
}
