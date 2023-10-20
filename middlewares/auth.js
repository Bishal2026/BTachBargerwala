import ErrorHandeler from "../utils/ErrorHandler.js";
export const isAuth = (req, res,next)=>{
        const  token = req.cookies['connect.sid'];
      
        if(!token){
            return next( new ErrorHandeler("Not Logged  In ",401))

        }
        next();
}
export const authorizeAdmin = (req, res,next)=>{
    
    if(req.user.role !== "admin"){
        return next( new ErrorHandeler("only admin allowed",405))

    }
    next();
}