import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import ListProducts from '../components/ListProducts'
import RegisterProducts from '../components/RegisterProducts'
import EditForm from '../components/EditForm'
import Register from '../auth/Register'
import Login from '../auth/Login'
import ProtectedRoute from './ProtectedRoute'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



export default function Menu() {

    const [user,setUser] = useState(false);

    useEffect(() => {
        setUser(!!sessionStorage.getItem('user'));
    }, [])
   
  return (
    <BrowserRouter>
        { 
            <header>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                    <Navbar.Brand href="#home">KodigoStore</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/productos">Productos</Nav.Link>
                        <Nav.Link href="/registro">Registro</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>                   
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
