import React from 'react';
import { useAuth } from '../context/auth';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

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

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = parseJwt(token);

    if (decoded && decoded.email && decoded.name) {
      const email = decoded.email;
      const isSansano = email.endsWith('@sansano.usm.cl')
      const isBenjamin = email === 'benjaminbarria06@gmail.com';

      let role = 'invitado';

      if (isBenjamin) {
        role = 'profesor';
      } else if (decoded.role) {
        role = decoded.role; // opcional si estás inyectando el rol desde el backend o Google Workspace
      } else if (isSansano) {
        role = 'estudiante';
      }

      const isAllowed = isBenjamin || isSansano || role === 'profesor' || role === 'estudiante';
      
      if (isAllowed) {
        login({ name: decoded.name, email, role  });
        navigate('/');
      } else{
        alert('Solo se permiten correos @sansano.usm.cl o tu cuenta autorizada.');
      }
    } else {
      alert('No se pudo procesar la respuesta de Google.');
    }
  };

  const handleError = () => {
    alert('Login fallido');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1>Iniciar sesión con Google</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}