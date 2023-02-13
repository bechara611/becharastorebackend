import { Router } from "express";
import { AuthGet } from "../controllers/Auth.js";

const RouterAuth = Router();

RouterAuth.get('/',AuthGet)


export default RouterAuth;