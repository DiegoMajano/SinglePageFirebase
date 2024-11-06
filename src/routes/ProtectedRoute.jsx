import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      Swal.fire({
        title: "No has iniciado sesión",
        text: "Para acceder a estas funciones debes iniciar sesión",
        icon: "info"
      });
      navigate('/login'); 
    } else {
      setIsLoading(false); 
    }
  }, [navigate]);

  if (isLoading) return <div>Loading...</div>;

  return children;
}