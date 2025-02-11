import "dotenv/config";
import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { fileURLToPath } from 'url';
import path from 'path';

// Definindo __filename e __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar sessão
app.use(
  session({
    secret: "meu_segredo",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Configurar Passport com Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Serve os arquivos estáticos da pasta do frontend
app.use(express.static(__dirname)); // Usa a pasta atual como raiz para os arquivos estáticos

// Rotas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Login com Google
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback do Google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// Perfil do usuário
app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.send(`
    <h1>Bem-vindo, ${req.user.displayName}!</h1>
    <img src="${req.user.photos[0].value}" alt="Foto do perfil" style="border-radius: 50%; width: 150px;">
    <p>Email: ${req.user.emails[0].value}</p>
    <a href="/logout">Logout</a>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
