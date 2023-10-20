import  express from "express";
import passport from "passport";
import { getAdminStats, getAdminusers, logout, myProfile } from "../controllers/user.js";
import { authorizeAdmin, isAuth } from "../middlewares/auth.js";
const  router = express.Router();

router.get("/googlelogin",passport.authenticate("google",{
    scope:["profile"],
}))

router.get(
    "/login",
    passport.authenticate("google", {
      successRedirect: process.env.FRONTEND_URL,
    })
  );

router.get("/me",isAuth, myProfile);
router.get("/logout", logout);

//admin

router.get("/admin/user",isAuth,authorizeAdmin,getAdminusers);
router.get("/admin/stats",isAuth,authorizeAdmin,getAdminStats);

export default router;