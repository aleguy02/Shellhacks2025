Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateResponse = async (query) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Given the provided query from a user, please answer the query in a way such that your response meets the following criteria. Each criterion will be enclosed in square brackets. Criteria: [### 1. **Relevance to Financial Assistance Program**
   - **Does the response directly address a financial assistance program providing aid or subsidies?
     - **Valid Response:** Provides information about the relevant program, such as how to apply or where to find resources.
     - **Invalid Response:** Provides unrelated financial advice (e.g., stock market investing).], [### 2. **Location-Specific Information**
   - **Does the response provide location-specific details,** such as office addresses, local contact information, or other resources related to a particular area?
     - **Valid Response:** Mentions a specific office or location where services can be accessed.
     - **Invalid Response:** Only refers to online or national services without regard to location.], [### 3. **Addresses Eligibility or Requirements**
   - **Does the response explain eligibility criteria, required documents, or qualifications** for applying to a financial assistance program or attending in-person services?
     - **Valid Response:** Lists required documents, qualifications, or local office policies.
     - **Invalid Response:** Discusses general financial aid options without addressing specific requirements.], [### 4. **Application Process Information**
   - **Does the response focus on how to apply for services or aid in person** at a local office or service center?
     - **Valid Response:** Explains the steps to apply in person, including required appointments or in-office visits.
     - **Invalid Response:** Focuses on applying through online platforms or mobile apps.], [### 5. **Program Benefits Usage**
   - **Does the response clarify how to receive or manage program benefits,** particularly when involving in-person collection or usage (e.g., picking up EBT cards)?
     - **Valid Response:** Provides details about how and where benefits can be collected or used.
     - **Invalid Response:** Discusses online transfers or methods unrelated to physical collection of benefits.], [### 6. **Support Services Information**
   - **Does the response mention support services that are connected to the financial aid program** and require in-person interaction, such as interviews or counseling?
     - **Valid Response:** Mentions interviews or in-person meetings required for the program.
     - **Invalid Response:** Refers to phone or online support without mentioning required in-person services.], [### 7. **Regional or Local Variations**
   - **Does the response address local or regional differences** in how a program operates (e.g., state-specific benefits, local office policies)?
     - **Valid Response:** Acknowledges state or county differences in benefits or procedures.
     - **Invalid Response:** Offers generic, nationwide information without addressing variations.], [### 8. **Renewal or Updates**
   - **Does the response provide information on renewing or updating program participation** that requires in-person follow-up?
     - **Valid Response:** Describes the process for renewing or updating benefits in person at a local office.
     - **Invalid Response:** Discusses online renewals or automated updates.], [### 9. **Emergency Assistance**
   - **Does the response provide information about emergency financial aid or services** that can be accessed in person?
     - **Valid Response:** Directs to local offices or centers providing emergency assistance.
     - **Invalid Response:** Focuses on remote or online delivery methods.], [### 10. **Clear and Single-Focused Response**
   - **Is the response focused on addressing only the query presented, without introducing multiple or unrelated answers?**
     - **Valid Response:** Answers the specific question directly and clearly.
     - **Invalid Response:** Answers multiple questions or adds unnecessary information unrelated to the query.], [### 11. **Clear Instructions and Vocabulary Clarification**
   - **Does the response offer clear and concise instructions on what the financial assistance programs or locations provide,** and does it clarify any specialized vocabulary or terms that might be confusing to the user?
     - **Valid Response:** Explains the purpose of the program (e.g., SNAP provides assistance for purchasing groceries) and clarifies any complex terms (e.g., defining EBT as "Electronic Benefit Transfer").
     - **Invalid Response:** Uses jargon or assumes prior knowledge of program functions without providing explanations or clear guidance.].

This is the query: ${query}. FORMAT YOUR RESPONSE AS A PARAGRAPH LIMITED TO 2 SENTENCES MAXIMUM.`,
      },
    ],
    model: "llama3-8b-8192",
  });

  // Print the completion returned by the LLM.
  return chatCompletion.choices[0]?.message?.content;
};

module.exports = generateResponse;
