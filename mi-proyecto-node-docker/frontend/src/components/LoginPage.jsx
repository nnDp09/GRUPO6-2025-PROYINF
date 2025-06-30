import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/auth'; // Asegúrate que la ruta esté bien

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ aquí usamos login del contexto

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const onSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = parseJwt(token);
    console.log("Token decodificado:", decoded);

    if (decoded && decoded.email && decoded.name) {
      login({ name: decoded.name, email: decoded.email }); // ✅ Guarda en estado y localStorage
      navigate('/');
    } else {
      alert("Error procesando el token de Google.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Inicia sesión con Google</h1>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => alert('Error en login')}
      />
    </div>
  );
}

export default LoginPage;
