import JWT from 'jsonwebtoken'

export const GenerarJWT = (email, _id) => {
    return new Promise((resolve, reject) => {
        try {
            const payload = { email, _id }
            JWT.sign(payload, process.env.KEYJWT, (error, token) => {
                if (error) {
                    console.log(error)
                    return reject(null)
                } else {
                    return resolve(token)
                }
            })

        } catch (error) {
            console.log(error)
            return reject(null)
        }



    })
}
