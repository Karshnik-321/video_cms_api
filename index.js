var express = require('express');
var app = express();
const cors = require('cors');

app.use(cors());

var jwt = require("jsonwebtoken");

var token = require("./secret.json").ACCESS_SECRET_TOKEN;

app.use(express.json())

const version = require("./config/config.json").version;
var route_path = `./Routes/${version}`;
// var authMiddleware = require("./middleware/auth").authMiddleware;
const authRouter = require(route_path+"/Auth/authRoute");


// const errorMiddlename = require("./middleware/error-middleware");

app.use("/api/v1", [ 
    authRouter,
]);



// app.use(errorMiddlename);
const port = process.env.PORT || 3001;

app.listen(port,()=>console.log(`Server Started on port ${port}`));