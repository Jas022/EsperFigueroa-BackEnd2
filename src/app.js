import express from "express";
import { engine } from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import { router as sessionsRouter } from "./routes/sessions.Router.js";
import { router as villanosRouter } from "./routes/villanosRouter.js";
import { router as vistasRouter } from "./routes/viewsRouter.js";
import { connDB } from "./ConnDB.js";
import { config } from "./config/config.js";
import { auth } from "./middleware/auth.js";
import { iniciarPassport } from "./config/passport.config.js";
import { router as usuariosRouter } from "./routes/usuariosRouter.js"; 

const PORT = config.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

iniciarPassport();
app.use(passport.initialize());

app.use(express.static("./src/public"));

app.use("/api/sessions", sessionsRouter);
app.use(
  "/api/villanos",
  passport.authenticate("current", { session: false }),
  villanosRouter
);
app.use("/api/usuarios", usuariosRouter); 
app.use("/", vistasRouter);

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

connDB(config.MONGO_URL, config.DB_NAME);
