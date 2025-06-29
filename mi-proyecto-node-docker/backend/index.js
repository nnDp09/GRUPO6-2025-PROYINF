const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./db'); // Importar la conexión
const app = express();
const port = 3000;

const ALLOWED_EMAILS = ["benjaminbarria06@gmail.com"];

require('dotenv').config();

app.use(session({ secret: 'secreto', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// GOOGLE STRATEGY
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    if (!ALLOWED_EMAILS.includes(email)) {
      return done(null, false, { message: "Correo no autorizado" });
    }

    return done(null, profile);
  }
));

// RUTAS DE AUTENTICACIÓN
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login', // puedes personalizar esto
    session: true
  }),
  (req, res) => {
    res.redirect('http://localhost:5173'); // Redirige a React después del login
  }
);

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // o el puerto de tu React
  credentials: true // importante para enviar cookies de sesión
}));

  
  
  // Ruta de prueba que guarda un mensaje en la base de datos
  app.get('/save', async (req, res) => {
    try {
      await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, content TEXT)');
      await pool.query('INSERT INTO messages (content) VALUES ($1)', ['Hola desde PostgreSQL!']);
      res.send('Mensaje guardado en la base de datos');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user.id,
      name: req.user.displayName,
      email: req.user.emails[0].value
    });
  } else {
    res.status(401).json({ message: 'No autenticado' });
  }
});

  
  // Ruta para obtener todos los mensajes
  app.get('/messages', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM messages');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });
  
  app.get('/', (req, res) => {
    res.send('¡Bienvenido! Usa /save para guardar un mensaje y /messages para verlos.');
  });
  


  app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});