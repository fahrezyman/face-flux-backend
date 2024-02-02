const express = require("express");
const router = express.Router();
const employeeImageController = require("../controllers/employeeImageController");

router.post("/add", employeeImageController.gatherEmployeeImage);

module.exports = router;
