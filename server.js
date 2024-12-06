const express = require('express');
require('dotenv').config();

const { insertProcessedData, initializeFirebaseApp, fetchData } = require('./config/firebase.config');

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

app.post('/firestore', async (req, res) => {
  // const { } = req.body;
  try {
    await insertProcessedData();
  } catch (error) {
    return res.status(400).json({
      status: 0,
      message: error.message
    });
  }

  res.json({
    status: 1,
    message: "Data inserted successfully"
  })
});

app.get('/firestore', async (req, res) => {
  try {
    const resp = await fetchData();
    res.json({
      status: 1,
      message: "Data Fetched successfully",
      data: resp
    });
  } catch (error) {
    return res.status(400).json({
      status: 0,
      message: error.message
    });
  }
});

// start server --------------------------------
const PORT = 4500;
app.listen(PORT, () => {
  initializeFirebaseApp();
  console.log("Server running on PORT:", PORT);
});