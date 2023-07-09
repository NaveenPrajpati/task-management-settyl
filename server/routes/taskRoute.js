const express = require("express");
const {  allTask, saveTask, allMessage, updateTask,generateOrderId } = require("../controller/taskController");
const validateToken = require("../middleware/validateTokenHandler");


const router = express.Router();

//public routes

router.post("/",validateToken, saveTask);
router.get("/", allTask);
router.get("/message/id",validateToken, generateOrderId);
router.put("/:id",validateToken, updateTask);


module.exports = router;