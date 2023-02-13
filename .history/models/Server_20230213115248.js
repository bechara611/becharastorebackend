import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
class Server{

constructor(){
    this.app=express();
    this.port=process.env.PORT
}



IniciarServidor(){

}


}

export default Server;