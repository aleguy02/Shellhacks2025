Groq = require("groq-sdk");
require("dotenv").config();
const formatJSON = require("../utils/formatJSON");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const findResources = async (lon, lat, query) => {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `You are an expert assistant tasked with identifying economic support and financial resources that are relevant to a provided query for any given geographic location. Please follow the steps outlined below to collect relevant information and format it in JSON. The longitude and latitude of the location are (${lon}, ${lat}. The query is "${query}".

### Instructions:

1. **Research the Area**:
   - Using the provided coordinates (${lon}, ${lat}), determine the nearest city or town.
   - Search for local government websites, community organizations, non-profits, and charities that offer economic support services relevant to the query. 

2. **Identify Resources**:
   - Find at least 3 to 5 organizations or services within the region of the provided coordinates that offer economic support or services relevant to the query.
   - Make sure to prioritize official, trusted, and local sources such as government agencies, community action groups, or well-known charities.

3. **Data Structuring**:
   - For each resource you find, extract the following information:
     - **Name**: Name of the organization or service.
     - **Description**: A brief description of the services they provide.
     - **Services**: A list of specific services offered (e.g., rent assistance, job training, food distribution).
     - **Contact Information**: Include phone number, website, and address if available.

4. **Output Format**:
   - Structure the data in the following JSON format:
   
   {
     "resources": [
       {
         "name": "Resource Name",
         "description": "A brief description of the resource.",
         "services": ["Service 1", "Service 2"],
         "contact": {
           "phone": "Contact Phone",
           "website": "Website URL",
           "address": "Address of the organization"
         }
       },
       {
         "name": "Resource Name 2",
         "description": "A brief description of the resource.",
         "services": ["Service 1", "Service 2"],
         "contact": {
           "phone": "Phone",
           "website": "Website URL",
           "address": "Address"
         }
       },
       {
         "name": "Resource Name 3",
         "description": "A brief description of the resource.",
         "services": ["Service 1", "Service 2"],
         "contact": {
           "phone": "Contact Phone",
           "website": "Website URL",
           "address": "Address of the organization"
         }
       },
       {
         "name": "Resource Name 4",
         "description": "A brief description of the resource.",
         "services": ["Service 1", "Service 2"],
         "contact": {
           "phone": "Contact Phone",
           "website": "Website URL",
           "address": "Address of the organization"
         }
       },
       {
         "name": "Resource Name 5",
         "description": "A brief description of the resource.",
         "services": ["Service 1", "Service 2"],
         "contact": {
           "phone": "Contact Phone",
           "website": "Website URL",
           "address": "Address of the organization"
         }
       }
     ]
   }

5. **Verification**:
   - Verify that the data is correctly formatted. Any fields that aren't populated should be assigned a value of "MISSING".

6. **Consistent Results**:
   - If the search yields fewer than 3 resources, any fields that aren't populated should be assigned a value of "MISSING".

RESOURCES SHOULD BE RELEVANT TO THE QUERY. IF ANY FIELD OR INFORMATION IS MISSING, ADD A VALUE OF "MISSING". REMEMBER YOUR RESPONSE IS IN A STRINGIFIED JSON, DO NOT RESPOND IN ANY OTHER FORMAT!`,
          },
        ],
        model: "llama3-8b-8192",
        temperature: 0.4
      });;

      // Strip, format, and parse the completion returned by the LLM as JSON.
      const parsedData = await formatJSON((chatCompletion.choices[0]?.message?.content));
      return parsedData
};

module.exports = findResources;