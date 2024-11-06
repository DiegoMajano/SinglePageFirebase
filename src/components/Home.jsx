import { onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect  } from 'react'
import { signOut } from 'firebase/auth'
import Login from '../auth/Login'
import { auth_user } from '../firebase/appConfig'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'



export default function Home() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth_user, (userFirebase) => {
      if (userFirebase) {
        console.log(userFirebase);      
        setUser(userFirebase);
        sessionStorage.setItem('user', JSON.stringify(userFirebase)); // store user data if needed
      } else {
        setUser(null);
        sessionStorage.removeItem('user'); // clear session if user is not logged in
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

   // metodo para cerrar la sesion

   const logout = () => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Cerrar sesión",
      text: "¿Estás seguro de cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si deseo cerrar sesión",
      cancelButtonText: "No, cancel!",
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {

        signOut(auth_user)
        .then(() => {
          sessionStorage.clear();
          setUser(null);
          navigate('/login');     
        })
        .catch((error) => {
          console.error("Error al cerrar sesión", error);
        });

        swalWithBootstrapButtons.fire({
          title: "Sesión cerrada",
          text: "Has cerrado tu sesión exitosamente",
          icon: "success"
        });
      } 
    });    
  };



  return (
    <div>
      {
        user ?
        <>
          <h1>Bienvenido a la aplicacion</h1>
          <p>Has iniciado sesión</p>
          <button onClick={logout}>Cerrar Sesión</button>    
        </>
        : <Login />
      }      
    </div>
  )
}
