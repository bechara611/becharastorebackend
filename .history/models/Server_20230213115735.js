import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8081;
        this.Middlewares();
    }
    Middlewares(){
     //   this.app.use(express.static('public'));
    }

    IniciarServidor() {
        this.app.listen(this.port, () => {
            console.log(`APP OK IN ${this.port}`)
        })
    }


}

export default Server;