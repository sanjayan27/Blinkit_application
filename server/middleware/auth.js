
import jwt from 'jsonwebtoken'

const auth =async(req,res,next)=>{
    try {
        const token = req.cookies.accessToken 
        if(!token){
            return res.status(400).json({
                message: 'provide token',
                error: true,
                success : false
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_ACCESS_TOKEN);
        
        if(!decode){
            return res.status(401).json({
                message: 'unauthorized user',
                error : true,
                success : false
            })
            
        };
        req.userID = decode.userID;
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message || error
        })
    }
}

export default auth