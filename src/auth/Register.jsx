import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth_user } from '../firebase/appConfig';

// creando squema ()

const schema = yup.object().shape({
  email: yup.string().required("El correo es obligatorio").email("Correo inválido, ejemplo: usuario@dominio.com"),
  password: yup.string().required("Campo Obligatorio").min(8, "La contraseña debe contener al menos 8 caracteres"), 
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Las contraseñas no coinciden")
})

export default function Register() {

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    //constante para la navegacion
    const navigate = useNavigate()

    //creando un usuario para firebase
    const registerForm = (data) => {
        console.log(data);
        
        createUserWithEmailAndPassword(auth_user, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user); //mandaria la info del usuario (correo)
            //redigirlo a la pagina principal
            sessionStorage.setItem('user', userCredential.user.email)
            navigate('/home')
        }).catch((error) => {
            console.log("Error al registrar el usuario", error);
        })
    }


  return (

    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                    <div className="card-body p-5 text-center">
                        <h3 className="mb-5">Registrar usuario</h3>
                        <form onSubmit={handleSubmit(registerForm)}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Correo Electrónico</label>
                                <input
                                type="email"
                                id="email"
                                className="form-control form-control-lg"
                                placeholder="Ingrese su correo"
                                {...register("email", { required: true })}
                                />
                                <span style={{ color: "red" }}>
                                {errors.email && errors.email.message}
                                </span>
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
                                <span style={{ color: "red" }}>
                                {errors.password && errors.password.message}
                                </span>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <input
                                type="password"
                                id="confirmPassword"
                                className="form-control form-control-lg"
                                placeholder="Confirme su contraseña"
                                {...register("confirmPassword", { required: true })}
                                />
                                <span style={{ color: "red" }}>
                                {errors.confirmPassword && errors.confirmPassword.message}
                                </span>
                            </div>

                            <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">Registrarse</button>
                            
                            <div className=''>
                                <p>Si ya no tienes cuenta <Link to="/login">Inicia Sesión Aquí!</Link></p>
                            </div>   
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
