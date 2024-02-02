const axios = require("axios");
const pool = require("../config/db");

const gatherEmployeeImage = async (req, res) => {
  const employeeId = req.body.employee_id;

  if (!employeeId) {
    return res.status(400).json({ error: "Employee ID is required" });
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/employee-images/add/",
      {
        employee_id: employeeId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  gatherEmployeeImage,
};
