import { model, Schema } from "mongoose";

const Categorias = new Schema({
    categoryName:{
        type:String,
        required:[true,'PLEASE, INSERT A CATEGORY']
    },
    
})

export default model('Categorias',Categorias)
//TODO crear modelo completo de productos guiate del frontend

