//ruta     {rutaBase}/products/'

import { Router } from "express";
import { check } from "express-validator";
import { getProductos } from "../controllers/Products.js";
import { ComprobarAdmin } from "../helpers/HelpersAuth.js";
import { ValidarErrores } from "../helpers/ValidarErrores.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";

const RutasProductos = Router();

RutasProductos.get('/',
[check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
check('email','PLEASE INSERT AN ADMIN EMAIL').not().isEmpty(),
check('email').custom(ComprobarAdmin),
ValidarErrores],
getProductos)

export default RutasProductos;