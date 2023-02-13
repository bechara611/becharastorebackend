import mongoose from "mongoose"

const conectarDB =async()=>{
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGODB,()=>{
            console.loh('BD OK')
        })
    } catch (error) {
        console.log(error)
        throw new Error;
    }
}