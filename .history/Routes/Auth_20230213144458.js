//RUTA: URL/AUTH/
import { Router } from "express";
import { check } from "express-validator";
import { AuthGet, AuthPostLogin, AuthPostRegister } from "../controllers/Auth.js";
import { ValidarErrores } from "../helpers/ValidarErrores.js";

const RouterAuth = Router();

RouterAuth.get('/',AuthGet)
RouterAuth.post('/register',AuthPostRegister,[
    check('email','PLEASE INSERT A EMAIL').not().isEmpty(),
    check('email','PLEASE, INSERT A VALID EMAIL').isEmail(),
    ValidarErrores
])
RouterAuth.post('/login',AuthPostLogin)

export default RouterAuth;