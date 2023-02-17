//ruta     {rutaBase}/products/'

import { Router } from "express";
import { check } from "express-validator";
import { getProductos, postInsertarProducto } from "../controllers/Products.js";
import { MiddlewareCantidad } from "../helpers/HelpersProducts.js";
import { ValidarErrores } from "../helpers/ValidarErrores.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";

const RutasProductos = Router();

RutasProductos.get('/',
[check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores],
getProductos)

RutasProductos.post('/insert',
[check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
check('idstore','PLEASE, INSERT A ID STORE').not().isEmpty(),
check('urlimg','PLEASE, INSERT AN IMAGE').not().isEmpty(),
check('description','PLEASE, INSERT A SHORT DESCRIPTION').not().isEmpty(),
check('categoria','PLEASE, INSERT A CATEGORY').not().isEmpty(),
check('descriptionLong','PLEASE, INSERT A LONG DESCRIPTION').not().isEmpty(),
check('price','PLEASE, INSERT A PRICE').not().isEmpty(),
check('cantidad','PLEASE, INSERT AN AMOUNT').not().isEmpty(),
check('cantidad').custom(MiddlewareCantidad),
ValidarErrores],
postInsertarProducto)

export default RutasProductos;