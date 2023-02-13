import { request, response } from "express";
import Usuarios from "../models/Usuarios.js";

export const ComprobarUser=async(email)=>{
    const usuario = new Usuarios();
    const Encontrado = await Usuarios.findOne({email})
    if(Encontrado){
        return true
    }else{
        return null
    }

}