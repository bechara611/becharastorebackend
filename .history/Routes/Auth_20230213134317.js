import { Router } from "express";
import { AuthGet } from "../controllers/Auth";

const RouterAuth = Router();

RouterAuth.get('/',AuthGet)


export default RouterAuth;