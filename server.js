// Creating Server
const exp = require("express");
const app = exp();

// Import the path module
const path = require("path");

// Importing MogoClient
const mc = require("mongodb").MongoClient;

// Connecting dist folder with server.js
app.use(exp.static(path.join(__dirname,"dist/TechShareApp")));

// Database URL
const dburl = "mongodb+srv://TechShare:techshare@venu02.fnpkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let dbObj; // DB Object declared globally.
// Connect to MongoDB Atlas
mc.connect(dburl,{ useNewUrlParser:true, useUnifiedTopology:true })
.then(client=>{
    // Get DB Object
    dbObj = client.db("TechShare");
    // Making DB Object available for Apis
    app.locals.databaseObj = dbObj;
    console.log("Connected to DataBase successfully !!");
})
.catch(err=>{console.log("Error in DB connect ",err)});

// Importing Login and Register Apis
const loginApiRoute = require("./apis/loginApi");
const registerApiRoute = require("./apis/registerApi");

app.use("/login",loginApiRoute);
app.use("/register",registerApiRoute);

// Handling unavailable path
app.use((req,res,next)=>{
    console.log({message:`The path ${req.url} is invalid.`});
})

// Assigning port number to the Server
const port = 5000;
app.listen(port,()=>console.log(`Server on port ${port}`));