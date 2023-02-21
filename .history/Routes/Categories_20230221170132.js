
// {rutaBase}/categories/'
import { Router } from "express";
import { check } from "express-validator";
import { getCategorias, PostCategorias } from "../controllers/Categorys.js";
import { ValidarErrores } from "../helpers/ValidarErrores.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";

const RutasCategorias = Router();

RutasCategorias.get('',
check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores,
getCategorias)

RutasCategorias.post('/insert/',
check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores,
PostCategorias)

export default RutasCategorias