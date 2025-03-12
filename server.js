import "dotenv/config";
import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { fileURLToPath } from 'url';
import path from 'path';
import admin from "./firebaseAdmin.js";

// Definindo __filename e __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializa o app Express
const app = express();

// Middleware para ler JSON no corpo da requisição
app.use(express.json());

// Configurar sessão
app.use(
  session({
    secret: "meu_segredo",
    resave: false,
    saveUninitialized: true,
  })
);

// Inicializa o Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurar estratégia do Google
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

// Serve os arquivos estáticos (como index.html, CSS, etc)
app.use(express.static(__dirname));

// Rotas públicas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

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

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// ✅ Rota protegida com verificação de token JWT do Firebase
app.post("/verifica-token", async (req, res) => {
  const idToken = req.body.token;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Usuário autenticado:", decodedToken);
    res.status(200).json({ success: true, uid: decodedToken.uid });
  } catch (error) {
    console.error("Token inválido", error);
    res.status(401).json({ success: false, message: "Token inválido" });
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
