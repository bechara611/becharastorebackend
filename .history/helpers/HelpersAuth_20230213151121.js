import { request, response } from "express";
import Usuarios from "../models/Usuarios.js";

export const ComprobarUser=async(email)=>{

    const user = await Usuarios.findOne({email})
    if(Encontrado){
        return user
    }else{
        return null
    }

}