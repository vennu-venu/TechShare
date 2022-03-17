const exp = require("express");
const registerApiRoute = exp.Router();
registerApiRoute.use(exp.json());
const bcrypt = require("bcryptjs");

registerApiRoute.post("/create",async (req,res)=>{
    userDetails=req.body;
    username=userDetails.username;
    email=userDetails.emailId;
    // Getting DB Object
    let dbObj = req.app.locals.databaseObj;
    // Getting Data
    let obj = await dbObj.collection('UserAccount').findOne({$or:[{"username":username},{"emailId":email}]});
    
    if(obj!=null){
        res.send({message:"username or Email already in exist"});
    }
    else{
        let hashpw = await bcrypt.hash(userDetails.password,5);
        userDetails.password = hashpw;
        delete userDetails.cpassword;
        delete userDetails.acceptTerms;
        dbObj.collection("UserAccount").insertOne(userDetails)
        .then(created=>{
            res.send({message:"Account created successfully !!"});
        })
        .catch(err=>{console.log("Error in creating account ",err)});
    }
})

// Export registerApiRoute
module.exports = registerApiRoute;