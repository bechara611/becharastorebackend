import { Router } from "express";
import { AuthGet, AuthPost } from "../controllers/Auth.js";

const RouterAuth = Router();

RouterAuth.get('/',AuthGet)
RouterAuth.post('/',AuthPost)


export default RouterAuth;