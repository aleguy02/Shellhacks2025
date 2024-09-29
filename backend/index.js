const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const getPromptValidity = require("./controllers/promptValidityController");
const generateResponse = require("./controllers/generateResponseController");
const findResources = require("./controllers/findResourcesController");


port = process.env.PORT || 5001;

// Using json middleware
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.status(200).send({data: "data", numbers: "12345"});
})

// User films out form with their question
app.post("/", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            res.send("Form cannot be empty!")
        } else if (query.length > 555) {
            res.send("You broke the check and somehow submitted a query larger than 555 characters. Congrats!")
        } else {
            console.log("Query posted");
            promptValidity = await getPromptValidity(query)
            if (promptValidity == 2) {  // 2 indicates that prompt is neither valid or invalid, an edge case that occurs when Groq behaves unexpectedly
              res.send("Something went wrong. Rephrase you question and try again.");
            } else if (promptValidity == 0) {
              res.send("Question invalid. Are you asking for assistance with financial resources?");
            } else if (promptValidity == 1) {
              response = await generateResponse(query);
              resources = await findResources(28.538336, -81.379234, query);

              res.send(response, findResources);
            }
        }
    } catch (error) {
        console.log("Backend error occured:", error.message)
    }
})

app.listen(port, () => {
    console.log("Running on port:", port)
})



