import mongoose from "mongoose"

const conectarDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGODB,()=>{
            console.loh('BD OK')
        })
    } catch (error) {
        throw new Error;
    }
}