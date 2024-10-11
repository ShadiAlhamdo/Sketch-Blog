const jwt=require("jsonwebtoken");

//verfiy token

function verifyToken(req,res,next){
    const authToken=req.headers.authorization
    if(authToken){
        const token =authToken.split(" ")[1]
        try{
            const decodedpayload=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decodedpayload;
            next();
        }
        catch(error){
            return res.status(401).json({message:"Invalid token,access denied"})
        }
    }else{
        return res.status(401).json({message:"No token Provided,access denied"})

    }
};

//verify token & IsAdmin
    function verifytokenAdmin(req,res,next){
        verifyToken(req,res,()=>{
            if(req.user.isAdmin){
                next();
            }else{
                return res.status(403).json({message:"not Allowed Only Admin"})

            }
        })
    };

 //verify token & Only Youse himself
function verifytokenOnlyUser(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id==req.params.id){
            next();
        }else{
            return res.status(403).json({message:"not Allowed Only Youser Himself"})

        }
    })
};

//verify token & Authorization
function verifyTokenAndAuthorization(req,res,next){
verifyToken(req,res,()=>{
    if(req.user.id==req.params.id || req.user.isAdmin){
        next();
    }else{
        return res.status(403).json({message:"not Allowed Only Youser Himself"})

    }
})
};


module.exports={
    verifyToken,
    verifytokenAdmin,
    verifytokenOnlyUser,
    verifyTokenAndAuthorization,
}