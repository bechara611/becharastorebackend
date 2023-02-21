
// {rutaBase}/categories/'
import { Router } from "express";
import { check } from "express-validator";
import { getCategorias } from "../controllers/Categorys.js";
import { ValidarErrores } from "../helpers/ValidarErrores.js";

const RutasCategorias = Router();

RutasCategorias.get('',
check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores,
getCategorias)

export default RutasCategorias