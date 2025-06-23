import jwt from 'jsonwebtoken'

const generatedAccessToken =async(userID)=>{
    const token = await jwt.sign({userID},process.env.SECRET_ACCESS_TOKEN,{expiresIn: '5h'})
    return token
}

export default generatedAccessToken