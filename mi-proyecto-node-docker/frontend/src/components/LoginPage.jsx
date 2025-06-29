import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h2>Inicia sesión con Google</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("Éxito:", credentialResponse);
          // Aquí puedes enviar el token al backend
        }}
        onError={() => {
          console.log("Fallo en el login");
        }}
      />
    </div>
  );
}

export default LoginPage;