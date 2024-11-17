import express from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import passport from "passport";
import { config } from "./config/config.js";
import cookieParser from "cookie-parser";
import { router as productRouter } from "./routes/productRouter.js";
//import { router as cartsRouter } from "./routes/cartRouter.js";
import { router as sessionsRouter } from "./routes/sessionsRouter.js";
import { ConnDB } from "../src/ConnDB.js";
import { auth } from "./middleware/auth.js";
import { initPassport } from "./config/passport.config.js";
import { router as ordenesRouter } from "./routes/ordenesRouter.js";
import { router as negociosRouter } from "./routes/negociosRouter.js";
import { router as usuariosRouter } from "./routes/usuariosRouter.js";
import cartsRouter from "./routes/cartRouter.js";

const PORT = config.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser());
app.use("/api/usuarios", usuariosRouter);
app.use("/api/negocios", negociosRouter);
app.use("/api/ordenes", ordenesRouter);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

initPassport();
app.use(passport.initialize());

app.use(express.static("./src/public"));

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

await ConnDB.conectar(config.MONGO_URL, config.DB_NAME)
