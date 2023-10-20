import  express from "express";

import { authorizeAdmin, isAuth } from "../middlewares/auth.js";
import {  getAdminOrders, getMyOrders, getOrderDetails,paymentVerification,placeOrder, placeOrderonline, processOrder } from "../controllers/order.js";

const  router = express.Router();


router.post("/createorder",isAuth, placeOrder);
router.post("/createorderonline", isAuth,placeOrderonline);
router.post("/paymentverification",isAuth,paymentVerification);


router.get("/myorders", isAuth, getMyOrders);
router.get("/order/:id", isAuth, getOrderDetails);

//add middle ware
router.get("/admin/orders", isAuth, authorizeAdmin, getAdminOrders);
router.get("/admin/order/:id", isAuth, authorizeAdmin,processOrder);

export default router;