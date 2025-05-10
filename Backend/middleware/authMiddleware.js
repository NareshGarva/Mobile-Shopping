const jwt = require("jsonwebtoken");

const authenticateToken = (req,res,next) =>{
    const authHeader = req.headers['authorization'];

     // Token format: "Bearer <token>"
     const token = authHeader && authHeader.split(' ')[1];

     if(!token){
        return res.status(401).json({message: "Access denied : no token provided"});
     }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        // check if token is expired
        const currentTime = Math.floor(Date.now()/1000); //in seconds
        if(decoded.exp < currentTime){
            return res.status(403).json({message: "Token expired"});
        }
        req.user = decoded; // attach user info to request
        next();
    }
    catch(err){
        res.status(403).json({message: "Invalid Token"});
    }
}

module.exports = authenticateToken;