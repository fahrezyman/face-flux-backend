const pool = require("../config/db");

class Employee {
  static async getAllEmployees() {
    try {
      const [rows] = await pool.query("SELECT * FROM employee");
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getEmployeeById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM employee WHERE employee_id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async addEmployee(name, position, department) {
    try {
      if (!name || !position || !department) {
        throw new Error("Name, position, and department are required");
      }

      const [existingEmployee] = await pool.query(
        "SELECT * FROM employee WHERE name = ?",
        [name]
      );

      if (existingEmployee.length > 0) {
        return "Employee already exists";
      }

      const [rows] = await pool.query(
        "INSERT INTO employee (name,position,department) VALUES (?,?,?)",
        [name, position, department]
      );

      if (!rows.insertId) {
        throw new Error("Failed to add employee");
      }

      return `Employee added Successfully, ID: ${rows.insertId}`;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async editEmployee(employee_id, name, position, department) {
    try {
      if (!employee_id || !name || !position || !department) {
        throw new Error("Missing required parameters");
      }

      const [rows] = await pool.query(
        "UPDATE employee SET name = ?, position = ?, department = ? WHERE employee_id = ?",
        [name, position, department, employee_id]
      );

      if (rows.affectedRows <= 0) {
        throw new Error("No rows affected");
      }

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteEmployee(employee_id) {
    try {
      if (!employee_id) {
        throw new Error("Employee ID is required");
      }

      const [rows] = await pool.query(
        "DELETE FROM employee WHERE employee_id = ?",
        [employee_id]
      );

      if (rows.affectedRows > 0) {
        return true;
      } else {
        throw new Error("No employee found with the given ID");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = Employee;
