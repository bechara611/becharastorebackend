import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8082;
        this.Middlewares();
    }
    Middlewares(){
        //utilizar la parte del public static
        this.app.use(express.static('public'));
        //poder obtener json del body
        this.app.use(express.json())
        //cors para el acceso a nuestra aplicacion
        this.app.use(cors())
    }

    IniciarServidor() {
        this.app.listen(this.port, () => {
            console.log(`APP OK IN ${this.port}`)
        })
    }


}

export default Server;