import { Router } from "express";
import { getProductos } from "../controllers/Products.js";
//ruta     {rutaBase}/products/'
const RutasProductos = Router();

RutasProductos.get('/',getProductos)

export default RutasProductos;