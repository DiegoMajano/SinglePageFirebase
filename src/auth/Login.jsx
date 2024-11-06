import React from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth_user } from '../firebase/appConfig'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login() {

    const { register, handleSubmit, formState: {errors} } = useForm();
    const navigate = useNavigate()
    const loginForm = (data) => {
  
      signInWithEmailAndPassword(auth_user, data.email, data.password).then((userCredentiales) => {
        // si el usuario existe se extrae su informacion
        const user = userCredentiales.user
        sessionStorage.setItem('user', userCredentiales.user.email)
        navigate('/home')
        console.log(user);
        
  
      }).catch((error) => {
        console.error(error.message)
        Swal.fire({
          title: "Credenciales inválidas",
          text: "Revisa tu información",
          icon: "warning"
        });
      })
    }
  
    return (
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">

                  <h3 className="mb-3">Inicio de sesión</h3>

                  <img src="/store-svg.svg" alt="icono" width={200} className='mb-4'/>

                  <form onSubmit={handleSubmit(loginForm)}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">Correo Electrónico</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="Ingrese su correo"
                        {...register("email", { required: true })}
                      />
                      {errors.email && <span style={{ color: "red" }}>Campo Obligatorio</span>}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        placeholder="Ingrese su contraseña"
                        {...register("password", { required: true })}
                      />
                      {errors.password && <span style={{ color: "red" }}>Campo Obligatorio</span>}
                    </div>

                    <div className="form-check d-flex justify-content-start mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="rememberPassword"
                      />
                      <label className="form-check-label" htmlFor="rememberPassword">Recordar contraseña</label>
                    </div>

                    <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">Iniciar sesión</button> 
                    <div className=''>
                      <p>Si no tienes cuenta <Link to="/register">Regístrate Aquí!</Link></p>
                    </div>                  
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>


    )
  }
  