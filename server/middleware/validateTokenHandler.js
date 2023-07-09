
let jwt = require('jsonwebtoken');

const validateToken=async(req,res,next)=>{
    let token;
    // console.log("i m in validator")
    // console.log(req.body)

    let  authHeader=req.headers.Authorization || req.headers.authorization || req.body.headers.Authorization;
    

    if(authHeader && authHeader.startsWith("Bearer")){
        token =authHeader.split(" ")[1];
        // console.log(token)
        //verify token
        jwt.verify(token,process.env.ACCESS_TOKEN_SECREC,(error,decoded)=>{
            if(error){
                console.log(error)
                res.status(401);
                throw new Error("user is not authorized")
            }
            // console.log("validator decode- ",decoded)
            req.user=decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("user is not authorized or token missing")
        }
    }
}

module.exports=validateToken;