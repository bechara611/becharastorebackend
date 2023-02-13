import Server from "./models/Server";

export const Index =()=>{
const server = new Server();
server.IniciarServidor();
}
Index();