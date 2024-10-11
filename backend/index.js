const express=require("express");
const connectToDb=require("./config/connectToDb");
const xss=require("xss-clean")
const rateLimiting=require("express-rate-limit");
const helmet=require("helmet");
const hpp=require("hpp")
const { errorHandler, notFound } = require("./middleWares/error");
const cors=require("cors");
require("dotenv").config();




//Connection To Db
connectToDb();

//Init App
const app=express();


//MiddleWare
app.use(express.json());

// Security Headers (Helmet)
app.use(helmet());

// Prevent Http Param Pollution
app.use(hpp());

// Prevent XSS(Cross Site Scripteing) Attacks
app.use(xss());

// Rate Limiting
app.use(rateLimiting({
  windowMs:10 * 60 * 1000,  ///10 Minutes
  max:200                   
}))

// Cors Policy
const allowedIPs = ['http://localhost:3000', 'http://localhost:3001']; 
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedIPs.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Expose-Headers'],
}));

//Routes
app.use("/",(req,res)=>{
  res.send("Server Is Runnig ^_^")
})
app.use("/api/auth",require("./routes/authRoutse"))
app.use("/api/users",require("./routes/usersRoute"))
app.use("/api/posts",require("./routes/postRoute"))
app.use("/api/comments",require("./routes/commentRoute"))
app.use("/api/categories",require("./routes/categoryRoutes"))
app.use("/api/password",require("./routes/passwordRoutes"))
// 

// Error Handler Middle Ware
app.use(notFound)
app.use(errorHandler);


//Runing The Server

const PORT=process.env.PORT;
app.listen(80||PORT,()=>{console.log(`server is running in ${process.env.NODE_ENV} Mode on Port${PORT}`)})
