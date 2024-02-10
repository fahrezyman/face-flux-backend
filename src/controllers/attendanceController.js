const AttendanceModel = require("../models/attendance");

const addAttendanceTimeIn = async (req, res) => {
  try {
    const { employeeId, date, timeIn } = req.body;
    const insertResult = await AttendanceModel.timeIn(employeeId, date, timeIn);

    res.send(insertResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addAttendanceTimeOut = async (req, res) => {
  try {
    const { employeeId, date, timeOut, shiftId } = req.body;
    const result = await AttendanceModel.timeOut(
      employeeId,
      date,
      timeOut,
      shiftId
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addAttendanceTimeIn,
  addAttendanceTimeOut,
};
