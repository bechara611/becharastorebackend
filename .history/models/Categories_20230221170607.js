import { model, Schema } from "mongoose";

const categorias = new Schema({
    categoryName:{
        type:String,
        required:[true,'PLEASE, INSERT A CATEGORY']
    },
    
})

export default model('categorias',categorias)
//TODO crear modelo completo de categorias guiate del frontend

