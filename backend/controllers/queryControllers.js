const getPromptValidity = require("../utils/promptValidity")
const generateResponse = require("../utils/generateResponse");
const findResources = require("../utils/findResources");

const postQuery = async (req, res) => {
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
              resources = JSON.stringify(resources)

              res.send({"response": response, "resources": resources});
            }
        }
    } catch (error) {
        console.log("Backend error occured:", error.message)
    }
}

module.exports = postQuery