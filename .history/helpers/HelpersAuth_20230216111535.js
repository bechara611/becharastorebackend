import Usuarios from "../models/Usuarios.js";

export const ComprobarUser = async (email) => {
//helper que recibe el email y comprueba si existe en mongoDB devuelve null en caso de que no
    const user = await Usuarios.findOne({ email })
    if (user) {
        return user
    } else {
        return null
    }

}

export const ComprobarUserAndPassword = async (email,password) => {
    //helper que recibe el email y comprueba si existe en mongoDB devuelve null en caso de que no
        const user = await Usuarios.findOne({ email,password })
        if (user) {
            return user
        } else {
            return null
        }
    
    }

export const ComprobarAdmin = async(email)=>{
    const user = await Usuarios.findOne({email:email})
    if(user?.level!=='ADMIN'){
        throw new Error('YOU ARE NOT ADMIN, ACCESS DENIED!')
    }else{
        return true
    }
}