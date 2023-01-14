const express = require("express");

const router = express.Router();
const {getAllItems,getTask,updateTask,createTask,deleteTask} = require('../controllers/tasks');



router.route("/").get(getAllItems).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
