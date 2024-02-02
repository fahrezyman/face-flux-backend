const Employee = require("../models/employee");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { name, position, department } = req.body;
    const id = await Employee.addEmployee(name, position, department);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { name, position, department } = req.body;
    const result = await Employee.editEmployee(
      req.params.id,
      name,
      position,
      department
    );
    if (result) {
      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {}
};

const deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.deleteEmployee(req.params.id);
    if (result) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  getEmployeeById,
  editEmployee,
  deleteEmployee,
};
