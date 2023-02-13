import Server from "./models/Server.js";

export const Index =()=>{
const server = new Server();
server.IniciarServidor();
}
Index();