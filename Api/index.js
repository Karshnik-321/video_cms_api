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
const editorRouter = require(route_path+"/editor/editorRoute");
const campaignRouter = require(route_path+"/campaign/campaignRoute");
const platformRouter = require(route_path+"/platform/platformRoute");
const productRouter = require(route_path+"/product/productRoute");
const teamRouter = require(route_path+"/team/teamRoute");
const contentTypeRouter = require(route_path+"/content_type/contentTypeRoute");
const programRouter = require(route_path+"/program/programRoute");
const projectRouter = require(route_path+"/project/projectRoute");
const sourceRouter = require(route_path+"/source/sourceRoute");
const treatmentRouter = require(route_path+"/treatment/treatmentRoute");

// console.log(editorRouter)
// const errorMiddlename = require("./middleware/error-middleware");

app.use("/api/v1", [ 
    authRouter,
    editorRouter,
    campaignRouter,
    platformRouter,
    productRouter,
    teamRouter,
    contentTypeRouter,
    programRouter,
    projectRouter,
    sourceRouter,
    treatmentRouter
    
]);

// app.use(errorMiddlename);
const port = process.env.PORT || 3001;

app.listen(port,()=>console.log(`Server Started on port ${port}`));