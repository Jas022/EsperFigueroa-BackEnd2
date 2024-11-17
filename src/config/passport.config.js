//import passport from "passport";
//import local from "passport-local";
//import github from "passport-github2";
//import passportJWT from "passport-jwt";
//import { UsuariosManager } from "../dao/CartMongo.DAO.js";
//import { generaHash, validaHash } from "../utils.js";
//import { config } from "./config.js";

//const buscarToken = (req) => {
 // let token = null;

 // if (req.cookies.tokenCookie) {
 //   console.log(`passport recibe token...!!!`);
//    token = req.cookies.tokenCookie;
 // }

// return token;
//};

//export const iniciarPassport = () => {
 // passport.use(
  //  "registro",
 //   new local.Strategy(
  //    {
  //      passReqToCallback: true,
  //      usernameField: "email",
   //   },
  //   async (req, username, password, done) => {
  //      console.log("ingresa");
   //     try {
    //      let { nombre } = req.body;
     //     if (!nombre) {
     //       console.log(`Falta nombre`);
     //       return done(null, false);
      //    }
      //    let existe = await UsuariosManager.getBy({ email: username });
      //    if (existe) {
      //      console.log(`existe`);
      //     console.log(existe);
        //    return done(null, false);
      //    }

       //   password = generaHash(password);

       //   let nuevoUsuario = await UsuariosManager.addUser({
       //     nombre,
       //     email: username,
       //    password,
       //   });
        //  return done(null, nuevoUsuario);
      //  } catch (error) {
      //    return done(error);
      //  }
    // }
   // )
  //);

 //passport.use(
 //  "login",
  // new local.Strategy(
  //    {
   //     usernameField: "email",
   //   },
   //   async (username, password, done) => {
    //    try {
   //       console.log("Iniciando sesión para:", username);
    //      let usuario = await UsuariosManager.getBy({ email: username });

    //      if (!usuario) {
     //       console.log("Usuario no encontrado");
      //      return done(null, false, { message: "Usuario no encontrado" });
    //      }
//
      //    if (!validaHash(password, usuario.password)) {
      //      console.log("Contraseña incorrecta");
      //      return done(null, false, { message: "Contraseña incorrecta" });
      //    }

      //    delete usuario.password;
      //    console.log("Inicio de sesión exitoso:", usuario);
       //   return done(null, usuario);
     //   } catch (error) {
      //    console.error("Error en la autenticación:", error);
      //    return done(error);
    //    }
    //  }
  //  )
 //);
 // passport.use(
 //   "current",
  //  new passportJWT.Strategy(
 //     {
 //       secretOrKey: config.SECRET,
 //       jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([
  //        buscarToken,
 //       ]),
  //    },
  //   async (usuario, done) => {
    //    try {
   //       return done(null, usuario);
  //      } catch (error) {
    //      return done(error);
   //     }
   //   }
  //  )
 // );
//};
import passport from "passport";
import local from "passport-local";
import passportJWT from "passport-jwt";
import { usersService } from "../services/usersService.js";
import { cartService } from "../services/cartService.js";
import { generaHash, validaHash } from "../utils.js";
import { config } from "./config.js";

const buscarToken = (req) => {
  let token = null;

  if (req.cookies.CoderCookie) {
    token = req.cookies.CoderCookie;
  }

  return token;
};

export const initPassport = () => {
  passport.use(
    "registro",
    new local.Strategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          let { first_name: nombre, ...otros } = req.body;
          if (!nombre) {
            console.log("no llega nombre");
            return done(null, false, { message: "nombre es requerido" });
          }
          
          let existe = await usersService.getUserByEmail(username);
          console.log("passport usuario", existe);
          if (existe) {
            console.log("usuario ya existe");
            return done(null, false, { message: "email existe en db" });
          }
          password = generaHash(password);
          let carritoNuevo = await cartService.createCart();
          let nuevoUsuario = await usersService.createUser({
            nombre,
            ...otros,
            email: username,
            cart: carritoNuevo._id,
            password,
          });
          return done(null, nuevoUsuario);
        } catch (error) {
          console.log(error.message);
          return done(error);
        }
      }
    )
  ); 

  passport.use(
    "login",
    new local.Strategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          let usuario = await usersService.getUserByEmail(username);
          if (!usuario) {
            return done(null, false, { message: "Credenciales invalidas" });
          }
          if (!validaHash(password, usuario.password)) {
            return done(null, false, { message: "Credenciales invalidas" });
          }
          delete usuario.password;
          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new passportJWT.Strategy(
      {
        secretOrKey: config.SECRET,
      
        jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([
          buscarToken,
        ]),
      },
      async (usuario, done) => {
        try {
          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}; 