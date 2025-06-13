import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const navigate = useNavigate();

  const onSuccess = (credentialResponse) => {
    // credentialResponse.credential es el JWT token que Google te devuelve
    console.log("Google Credential:", credentialResponse.credential);

    // Aquí podrías validar el token con backend o guardar info en estado global/localStorage
    localStorage.setItem('token', credentialResponse.credential);

    // Redirigir a la página principal o a donde quieras
    navigate('/');
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Inicia sesión con Google</h1>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
}

export default LoginPage;
