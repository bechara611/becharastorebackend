import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import RouterAuth from '../Routes/Auth.js';
import { conectarDB } from '../DB/Config.js';
import RutasProductos from '../Routes/Products.js';
import fileUpload from 'express-fileupload';
dotenv.config()
class Server {

    constructor() {
        //inicializamos nuestra app de express
        this.app = express();
        //obtenemos nuestro port
        this.port = process.env.PORT || 8081;
        //generamos las rutas
        this.rutas={
            login:'/auth/',
            productos:'/products/'
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


        
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
              createParentPath:true//que el .mv al guardar el archivo pueda crear la carpeta si no existe
               }));


        //llamas las rutas
        this.Rutas();
        //llamamos la BD
        this.BaseDeDatos();

    }

    Rutas(){
        this.app.use(this.rutas.login,RouterAuth)
        this.app.use(this.rutas.productos,RutasProductos)
    }
    BaseDeDatos(){
        conectarDB();
    }

    IniciarServidor() {
        this.app.listen(this.port, () => {
            console.log(`APP OK IN ${this.port}`)
        })
    }


}

export default Server;