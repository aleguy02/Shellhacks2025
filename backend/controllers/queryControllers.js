const getPromptValidity = require("../utils/promptValidity")
const generateResponse = require("../utils/generateResponse");
const findResources = require("../utils/findResources");

const postQuery = async (req, res) => {
    try {
        const { query, zipcode } = req.body;
        if (!query) {
            res.status(400).send("Form cannot be empty. Please try again.")
        } else if (query.length > 555) {
            res.status(400).send("Form input must be less than 555 characters. Please try again.")
        } else {
            console.log("Query posted");
            promptValidity = await getPromptValidity(query)
            if (promptValidity == 2) {  // 2 indicates that prompt is neither valid or invalid, an edge case that occurs when Groq behaves unexpectedly
              res.status(500).send("Something went wrong. Rephrase you question and try again.");
            } else if (promptValidity == 0) {
              res.send("Question invalid. Are you asking for assistance with financial resources?");
            } else if (promptValidity == 1) {
              response = await generateResponse(query);
              resources = await findResources(zipcode, query);
              resources = JSON.stringify(resources)
              
              res.send({"response": response, "resources": resources});
            }
        }
    } catch (error) {
        console.log("Backend error occured:", error.message)
    }
}

module.exports = postQuery