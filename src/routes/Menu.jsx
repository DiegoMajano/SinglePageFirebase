import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import ListProducts from '../components/ListProducts'
import RegisterProducts from '../components/RegisterProducts'
import EditForm from '../components/EditForm'
import Register from '../auth/Register'
import Login from '../auth/Login'
import ProtectedRoute from './ProtectedRoute'



export default function Menu() {

    const [user,setUser] = useState(false);

    useEffect(() => {
        setUser(!!sessionStorage.getItem('user'));
    }, [])
   
  return (
    <BrowserRouter>
        { 
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/productos'>Productos</Link>
                        </li>
                        <li>
                            <Link to='/registro'>Registro</Link>
                        </li>
                    </ul>
                </nav>            
            </header> 
        }
        
        <Routes>
                {/* Rutas públicas */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                {/* Rutas protegidas */}
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/productos' element={<ProtectedRoute><ListProducts /></ProtectedRoute>} />
                <Route path='/registro' element={<ProtectedRoute><RegisterProducts /></ProtectedRoute>} />
                <Route path='/editar/:id' element={<ProtectedRoute><EditForm /></ProtectedRoute>} />
            </Routes>
    </BrowserRouter>
  )
}
