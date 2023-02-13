import { request, response } from "express";

export const AuthGet=(req=request,res=response)=>{
res.status(200).json({ok:'1234'})
}

export const AuthPost=(req=request,res=response)=>{
    res.status(200).json({ok:'Register'})
}