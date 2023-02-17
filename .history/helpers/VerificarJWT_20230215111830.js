import JWT from 'jsonwebtoken'

//?Este metodo obtenemos la informacion del token y es usado internamente en el controlador
export const VerificarJWT = async (token = '') => {
    try {
        return new Promise((resolve, reject) => {
            const payload = JWT.verify(token, process.env.KEYJWT)
            if (payload) {
                resolve(payload)
            } else {
                reject(null)
            }
        })
    } catch (error) {
        console.log(error)
        reject(null)
    }

}
//? este metodo/middleware es utilziado como custo check en la ruta para saber si el token es valido o no
export const VerificarJWTMiddleware = async (token = '') => {
    try {

        JWT.verify(token, process.env.KEYJWT)
        return true;
    }
    catch (error) {
      
        throw new Error('INSERT A VALID TOKEN')
    }

}
