import { Router } from "express";
import { check } from "express-validator";
import { getProductos } from "../controllers/Products.js";
import { ValidarErrores } from "../helpers/ValidarErrores.js";
//ruta     {rutaBase}/products/'
const RutasProductos = Router();

RutasProductos.get('/',
check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores,

getProductos)

export default RutasProductos;