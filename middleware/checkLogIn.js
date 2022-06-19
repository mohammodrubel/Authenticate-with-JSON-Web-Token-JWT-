const jwt = require('jsonwebtoken')
const checkLogIn = (req,res,next)=>{
    const {authorization} = req.headers;
    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {username,userId} = decoded;
        req.username = username;
        req.userId = userId;
        next()
    }
    catch{
        next("Authintication Faield!")
    }
}

module.exports = checkLogIn