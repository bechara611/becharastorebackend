import JWT from 'jsonwebtoken'

export const VerificarJWT =async (token='') => {
    try {
        return new Promise((resolve,reject)=>{
            const payload= JWT.verify(token,process.env.KEYJWT)
            if(payload){
                resolve(payload)
            }else{
                reject(null)
            }
        }) 
    } catch (error) {
        console.log(error)
        reject(null)
    }

}
