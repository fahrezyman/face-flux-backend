const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const employeeImageRoutes = require("./routes/employeeImageRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/admin", adminRoutes);
app.use("/employees", employeeRoutes);
app.use("/image", employeeImageRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
