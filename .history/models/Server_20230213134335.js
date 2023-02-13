import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import RouterAuth from '../Routes/Auth';
dotenv.config()
class Server {

    constructor() {
        //inicializamos nuestra app de express
        this.app = express();
        //obtenemos nuestro port
        this.port = process.env.PORT || 8081;
        //generamos las rutas
        this.rutas={
            login:'/auth'
        }
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

    Rutas(){
        this.app.use(this.rutas.login,RouterAuth)
    }

    IniciarServidor() {
        this.app.listen(this.port, () => {
            console.log(`APP OK IN ${this.port}`)
        })
    }


}

export default Server;