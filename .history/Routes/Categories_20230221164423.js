import { Router } from "express";
import { getCategorias } from "../controllers/Categorys";

const RutasCategorias = Router();

RutasCategorias.get('',getCategorias)

export default RutasCategorias