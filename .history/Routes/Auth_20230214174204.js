//RUTA: URL/AUTH/
import { Router } from "express";
import { check } from "express-validator";
import { AuthGet, AuthPostDelete, AuthPostLogin, AuthPostRegister, AuthUpdatePassword } from "../controllers/Auth.js";
import { ValidarErrores } from "../helpers/ValidarErrores.js";

const RouterAuth = Router();

RouterAuth.get('/',AuthGet)
//esta es la ruta para crear un usuario, recibe el email,password,name
RouterAuth.post('/register',
    check('email','PLEASE INSERT A EMAIL').not().isEmpty(),
    check('password','PLEASE INSERT A PASSWORD').not().isEmpty(),
    check('name','PLEASE INSERT A NAME').not().isEmpty(),
    check('email','PLEASE, INSERT A VALID EMAIL').isEmail(),
    check('password','PLEASE INSERT A VALID PASSWORD').isLength({min:6,max:20}),
    ValidarErrores,
    AuthPostRegister
)

RouterAuth.post('/login',
check('email','PLEASE INSERT A EMAIL').not().isEmpty(),
check('password','PLEASE INSERT A PASSWORD').not().isEmpty(),
check('password','PLEASE INSERT A VALID PASSWORD').isLength({min:6,max:20}),
ValidarErrores,
AuthPostLogin)

RouterAuth.post('/delete',
check('email','PLEASE INSERT A EMAIL').not().isEmpty(),
check('token','PLEASE, INSERT A TOKEN').not().isEmpty(),
ValidarErrores,
AuthPostDelete)

RouterAuth.update('/change',
check('email','PLEASE INSERT A EMAIL').not().isEmpty(),
check('password','PLEASE INSERT A PASSWORD').not().isEmpty(),
check('password','PLEASE INSERT A VALID PASSWORD').isLength({min:6,max:20}),
ValidarErrores,
AuthUpdatePassword)

export default RouterAuth;