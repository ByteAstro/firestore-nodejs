const express = require('express');
require('dotenv').config();

const app = express();

// middelwares ---------------------------------
app.use(express.json());

// routes --------------------------------------
app.get('/', (req, res) => {
  res.json({
    status: 1,
    message: "Server is working"
  })
});

// start server --------------------------------
const PORT = 4500;
app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});