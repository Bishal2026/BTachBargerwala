import express, { urlencoded } from "express";
import dotenv from "dotenv";
import {connectPassport} from "./utils/Provider.js"
import session from "express-session";
import passport from "passport"; 
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errormidlewares.js";
import cors from "cors";

const app = express();
export default app;

dotenv.config({
    path:"./config/config.env",
});




//middle ware

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie:{
        secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    }
}))

app.use(cookieParser());
app.use(express.json());
app.use(
    urlencoded({
        extended:true,
    })
)
app.use(
    cors({
        credentials:true,
        origin:process.env.FRONTEND_URL,
        methods:["GET","POST","PUT","DELETE"],

    })
)

app.use(passport.authenticate("session"))
app.use(passport.initialize())
app.use(passport.session())
app.enable("trust proxy");


connectPassport();


//routs
import userRoute from "./routes/user.js"
import orderRoute from "./routes/order.js"


app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);


//error
app.use(errorMiddleware)