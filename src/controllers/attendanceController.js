const AttendanceModel = require("../models/attendance");

const addAttendanceTimeIn = async (req, res) => {
  try {
    const { employeeId, date, time } = req.body;
    const result = await AttendanceModel.timeIn(employeeId, date, time);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addAttendanceTimeOut = async (req, res) => {
  try {
    const { employeeId, date, time } = req.body;
    const result = await AttendanceModel.timeOut(employeeId, date, time);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addAttendanceTimeIn,
  addAttendanceTimeOut,
};
