Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getPromptValidity = async (query) => {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Given the provided query from a user, please judge the query's validity based on the following criteria, but make sure your response is a number. If the query is valid based on the criteria, output the number 1. If the query is not valid based on the criteria, output the number 0. Each criterion will be enclosed in square brackets. Criteria: [### 1. **Program Alignment**
   - **Does the query relate to a financial assistance program** like SNAP (Supplemental Nutrition Assistance Program), TANF (Temporary Assistance for Needy Families), or similar programs that provide direct financial resources, aid, or subsidies?
     - **Valid Example:** "Where can I apply for TANF benefits?"
     - **Invalid Example:** "How can I start investing in the stock market?"], [### 2. **Location-Specific**
   - **Is the query location-specific or related to an in-person service or resource?** The request should reference programs or services that are provided at a specific location, such as local offices, in-person interviews, or physical distribution points.
     - **Valid Example:** "Where is the nearest SNAP office?"
     - **Invalid Example:** "Can I apply for financial aid online?"], [### 3. **Eligibility and Requirements**
   - **Is the query about eligibility criteria, required documents, or qualifications** for a financial assistance program or in-person service?
     - **Valid Example:** "What documents do I need to bring to apply for TANF at the local office?"
     - **Invalid Example:** "How do I apply for a student loan?"], [### 4. **Application Process**
   - **Is the query focused on the process for applying for aid or services in person** at a specific location, such as a government office or aid distribution center?
     - **Valid Example:** "How can I apply for housing assistance in person?"
     - **Invalid Example:** "Can I apply for food assistance through an app?"], [### 5. **Program Benefits**
   - **Is the query about receiving or managing financial aid benefits** (e.g., how to use an EBT card, where to pick up benefits) through an in-person process?
     - **Valid Example:** "Where do I pick up my TANF benefits?"
     - **Invalid Example:** "How can I transfer my benefits to my bank account?"], [### 6. **Support Services**
   - **Does the query relate to services associated with financial aid programs** (e.g., attending an interview, financial counseling, or support group) that require in-person attendance?
     - **Valid Example:** "Do I need to attend an interview for TANF benefits?"
     - **Invalid Example:** "Is there a helpline to check my SNAP balance?"], [### 7. **Regional/Local Variations**
   - **Does the query reference regional or local variations in how the program operates, such as office locations or county-specific policies?**
     - **Valid Example:** "Is there a difference in TANF benefits by state?"
     - **Invalid Example:** "How much can I get in TANF benefits nationwide?"], [### 8. **Program Renewal or Updates**
   - **Does the query focus on updating or renewing participation in a financial aid program that requires in-person follow-up?**
     - **Valid Example:** "Where do I go to renew my SNAP benefits?"
     - **Invalid Example:** "Can I renew my benefits automatically online?"], [### 9. **Emergency Assistance**
   - **Is the query about emergency financial aid or assistance provided in person, such as disaster relief or emergency housing?**
     - **Valid Example:** "Where can I get emergency financial assistance in my town?"
     - **Invalid Example:** "How do I get emergency aid delivered to my home?"], [### 10. **Single Query Focus**
   - **Is the query limited to a single question or request?** Only one question should be asked at a time to maintain focus and ensure clear, concise responses.
     - **Valid Example:** "Where can I apply for SNAP benefits in person?"
     - **Invalid Example:** "Where can I apply for SNAP benefits, and how long does it take to get approved?"]
                
This is the query: ${query}. REMEMBER YOUR RESPONSE IS IN A NUMBER (0, 1, OR 2), DO NOT RESPOND IN ANY OTHER FORMAT!`,
          },
        ],
        model: "llama3-8b-8192",
      });;
      
      // Logic determines if prompt aligns with our goals or not, or if something went wrong in the process
      if (chatCompletion.choices[0]?.message?.content == "0") {
        return 0;
      } else if (chatCompletion.choices[0]?.message?.content == "1") {
        return 1;
      } else {
        return 2;
      }
};

module.exports = getPromptValidity;