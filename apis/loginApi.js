const exp = require("express");
const loginApiRoute = exp.Router();
loginApiRoute.use(exp.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

loginApiRoute.post("/check",async (req,res)=>{
    userCredentialDetails=req.body;
    username=userCredentialDetails.username;
    password=userCredentialDetails.password;

    // Getting DB Object
    let dbObj = req.app.locals.databaseObj;
    // Getting Data
    let obj = await dbObj.collection('UserAccount').findOne({$or:[{"username":username},{"emailId":username}]});
    if(obj==null){
        res.send({message:"username or email does not exist"});
    }
    else{
        let result = await bcrypt.compare(password,obj.password);
        if(result==true){
            let signedToken = await jwt.sign({username:userCredentialDetails.username},"logicalcode",{expiresIn:200});
            res.send({message:"Login success !!",jwt:signedToken,userObj:obj});
        }
        else{
            res.send({message:"Wrong Password"});
        }
    }
    
})

// Export loginApiRoute
module.exports = loginApiRoute;