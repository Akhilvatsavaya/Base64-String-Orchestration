const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Import Routes
const mongoRoutes = require("./routes/mongoRoutes");
const mysqlRoutes = require("./routes/mysqlRoutes");

const app = express();
const PORT = 3000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api/mongo", mongoRoutes);
app.use("/api/mysql", mysqlRoutes);

//Starting the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});