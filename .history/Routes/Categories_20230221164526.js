
// {rutaBase}/categories/'
import { Router } from "express";
import { getCategorias } from "../controllers/Categorys";
import { ValidarErrores } from "../helpers/ValidarErrores";

const RutasCategorias = Router();

RutasCategorias.get('',
check('token','INSERT A VALID A TOKEN').custom(VerificarJWT),
ValidarErrores,
getCategorias)

export default RutasCategorias