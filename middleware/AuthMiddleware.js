const jwt = require("jsonwebtoken");
exports.protectRoutes= (req,res,next)=>{

/*
    1. Tthis gets the x-auth-header token from the incomming request
*/
    const token = req.header("x-auth-header");

    if(!token)
    {
        res.status(401).json({
            message : `Access denied. Request is missing token`
        })
    }

    //The request indeed has a header with the key x-auth-header
    else
    {
        try
        {

            //The requests contains a valid token with a VALID signature
            jwt.verify(token,process.env.JWT_SECRET) ;
            next();
        }
        catch(err)
        {

            res.status(401).json({
                message : `Access denied. Invalid Token`
            })

        }
       
    }

/*
    If there is indeed req with a header that contias 
    a x-auth-header token, check to see if it is a VALID ONE
*/


}