import { onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect  } from 'react'
import { signOut } from 'firebase/auth'
import Login from '../auth/Login'
import { auth_user } from '../firebase/appConfig'
import Menu from '../routes/Menu'
import { useNavigate } from 'react-router-dom'


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
    signOut(auth_user)
      .then(() => {
        alert("La sesión se ha cerrado");
        sessionStorage.clear();
        setUser(null);
        navigate('/login');   
      })
      .catch((error) => {
        console.error("Error al cerrar sesión", error);
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
