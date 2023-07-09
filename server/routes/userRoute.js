const express = require("express");
const { registerUser, loginUser, createPassword, getAllUsers} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();



router.post("/register",registerUser);
router.post("/login",loginUser)
router.put("/forget",createPassword)
router.get("/",validateToken, getAllUsers);




module.exports=router;