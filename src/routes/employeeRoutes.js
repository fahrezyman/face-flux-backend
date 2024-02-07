const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const attendanceController = require("../controllers/attendanceController");

//Untuk Masalah Employee
router.get("/get", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/add", employeeController.addEmployee);
router.put("/edit/:id", employeeController.editEmployee);
router.delete("/delete/:id", employeeController.deleteEmployee);

//Untuk Masalah Attendance
router.post("/attendance/timein", attendanceController.addAttendanceTimeIn);
router.post("/attendance/timeout", attendanceController.addAttendanceTimeOut);

module.exports = router;
