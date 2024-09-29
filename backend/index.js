const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const postQuery = require("./controllers/queryControllers")


port = process.env.PORT || 5001;

// Using json middleware
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.status(200).send("Get");
})

// User films out form with their question
app.post("/", postQuery)

app.listen(port, () => {
    console.log("Running on port:", port)
})



