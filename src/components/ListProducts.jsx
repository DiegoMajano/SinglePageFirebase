import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, onSnapshot, doc  } from 'firebase/firestore'
import db from '../firebase/appConfig'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
    <div className="container py-4">
      <h1 className="text-center mb-4">Lista de productos</h1>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
              <div className="card" style={{ width: "100%", minWidth: "10rem", borderRadius: "0.5rem" }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <div className="mt-auto">
                    <Link to={`/editar/${product.id}`} className="btn btn-link">Editar</Link>
                    <Button variant="danger" onClick={() => deleteProduct(product.id)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay productos</p>
        )}
      </div>
    </div>

  )
}
