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

      const [insertResult] = await pool.query(
        "INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)",
        [employeeId, date, timeIn]
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

  static async timeOut(employeeId, date, timeOut, shiftId) {
    try {
      if (!employeeId || !date || !timeOut || !shiftId) {
        throw new Error("One or more parameters are null or undefined");
      }

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
      throw error;
    }
  }
}

module.exports = Attendance;
