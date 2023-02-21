
// {rutaBase}/categories/'
import { Router } from "express";
import { check } from "express-validator";
import { getCategorias, PostCategorias ,DeleteCategorias } from "../controllers/Categorys.js";
import { ValidarErrores } from "../helpers/ValidarErrores.js";
import { VerificarJWT } from "../helpers/VerificarJWT.js";

const RutasCategorias = Router();

RutasCategorias.get('',
getCategorias)

RutasCategorias.post('/insert/',
check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores,
PostCategorias)

RutasCategorias.post('/insert/',
check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores,
DeleteCategorias)

export default RutasCategorias