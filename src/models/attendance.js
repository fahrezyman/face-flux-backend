class Attendance {
  static async getShiftIdByEmployeeIdAndDate(employeeId, date) {
    try {
      if (!employeeId || !date) {
        throw new Error("One or more parameters are null or undefined");
      }
      const [result] = await pool.query(
        "SELECT shift_id FROM attendance WHERE employee_id = ? AND date = ?",
        [employeeId, date]
      );

      return result[0].shift_id;
    } catch (error) {
      throw error;
    }
  }

  static async timeIn(employeeId, date, timeIn) {
    try {
      if (!employeeId || !date || !timeIn) {
        throw new Error("One or more parameters are null or undefined");
      }

      const shiftId = this.calculateShiftId(timeIn);
      const status = this.calculateStatus(shiftId, timeIn);

      const [insertResult] = await pool.query(
        "INSERT INTO attendance (employee_id, date, time_in,status, shift_id) VALUES (?, ?, ?,?,?)",
        [employeeId, date, timeIn, status, shiftId]
      );

      if (insertResult.affectedRows > 0) {
        return {
          success: true,
          message: "Attendance time in recorded successfully.",
        };
      } else {
        return {
          success: false,
          message: "Failed to record attendance time in.",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  static calculateShiftId(timeIn) {
    if (timeIn >= "06:00:00" && timeIn < "14:00:00") {
      return 1;
    } else if (timeIn >= "14:00:00" && timeIn < "22:00:00") {
      return 2;
    } else {
      if (timeIn < "06:00:00") {
        timeIn = "24:00:00";
      }
      if (timeIn >= "22:00:00") {
        return 3;
      } else {
        return null;
      }
    }
  }

  static calculateStatus(shiftId, timeIn) {
    if (shiftId === 1 && timeIn >= "07:15:00") {
      return "Terlambat";
    } else if (shiftId === 2 && timeIn >= "15:15:00") {
      return "Terlambat";
    } else if (shiftId === 3 && timeIn >= "23:15:00") {
      return "Terlambat";
    } else {
      return "On Time";
    }
  }

  static async timeOut(employeeId, date, timeOut, shiftId) {
    if (!employeeId) {
      throw new Error("employeeId is null or undefined");
    }
    if (!date) {
      throw new Error("date is null or undefined");
    }
    if (!timeOut) {
      throw new Error("timeOut is null or undefined");
    }
    if (!shiftId) {
      throw new Error("shiftId is null or undefined");
    }

    try {
      const [updateResult] = await pool.query(
        "UPDATE attendance SET time_out = ? WHERE employee_id = ? AND date = ? AND shift_id = ? AND time_in IS NOT NULL AND time_out IS NULL",
        [timeOut, employeeId, date, shiftId]
      );

      if (updateResult.affectedRows > 0) {
        return {
          success: true,
          message: "Attendance time out recorded successfully.",
        };
      } else {
        return {
          success: false,
          message: "Failed to record attendance time out.",
        };
      }
    } catch (error) {
      console.error("Error updating time out:", error);
      throw error;
    }
  }
}

module.exports = Attendance;
