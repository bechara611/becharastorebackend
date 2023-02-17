//ruta     {rutaBase}/products/'

import { Router } from "express";
import { check } from "express-validator";
import { getProductos, postInsertarProducto } from "../controllers/Products.js";
import { ValidarErrores } from "../helpers/ValidarErrores.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";

const RutasProductos = Router();

RutasProductos.get('/',
[check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores],
getProductos)

RutasProductos.post('/insert',
[check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores],
postInsertarProducto)

export default RutasProductos;