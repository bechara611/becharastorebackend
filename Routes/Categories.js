
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
check('CategoryName','INSERT A VALID CATEGORY').not().isEmpty(),
ValidarErrores,
PostCategorias)

RutasCategorias.delete('/delete/',
check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
check('CategoryName','PLEASE, INSERT A VALID CATEGORY').not().isEmpty(),
ValidarErrores,
DeleteCategorias)

export default RutasCategorias