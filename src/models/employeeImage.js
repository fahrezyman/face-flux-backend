const pool = require("../config/db");

class EmployeeImage {
  static async addEmployeeImageToDatabase(employeeId, imagePath) {
    try {
      const [rows] = await pool.query(
        "INSERT INTO employee_image (employee_id, image_data) VALUES (?, ?)",
        [employeeId, ImageData]
      );
      return rows.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = EmployeeImage;
