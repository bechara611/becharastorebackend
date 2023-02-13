import { Schema,model } from "mongoose"

const usuariosSchema = new Schema({
    email:{
        type:String,
        required:[true,'Insert an email'],
      //  unique:true
    },
    password:{
        type:String,
        required:[true,'Insert a password']
    },
    name:{
        type:String,
        required:[true,'Insert a name']
    }
})

export default model('usuarios',usuariosSchema);

