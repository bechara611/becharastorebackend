import mongoose from "mongoose"

export const conectarDB =async()=>{
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGODB,()=>{
            console.log('BD OK')
        })
    } catch (error) {
        console.log(error)
        throw new Error;
    }
}