import JWT from 'jsonwebtoken'

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

export const VerificarJWTMiddleware = async (token = '') => {
    try {

        JWT.verify(token, process.env.KEYJWT)
        return true;
    }
    catch (error) {
       
        throw new Error('INSERT A VALID TOKEN')
    }

}
