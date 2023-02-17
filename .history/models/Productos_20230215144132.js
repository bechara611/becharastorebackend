import { model, Schema } from "mongoose";

const Productos = new Schema({
    name:{
        type:String,
        required:[true,'PLEASE, INSERT A NAME']
    }
})

export default model('Productos',Productos)
//TODO crear modelo completo de productos guiate del frontend