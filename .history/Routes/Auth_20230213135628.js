import { Router } from "express";
import { AuthGet, AuthPostLogin, AuthPostRegister } from "../controllers/Auth.js";

const RouterAuth = Router();

RouterAuth.get('/',AuthGet)
RouterAuth.post('/register',AuthPostRegister)
RouterAuth.post('/login',AuthPostLogin)

export default RouterAuth;