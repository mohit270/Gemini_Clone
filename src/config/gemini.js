import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyAsFXwRKDNF68oNYyLe6TTn-yhSTuYD_ns");

const runChat = async (prompt) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    const text = result.response.text();
    console.log("Gemini response:", text);

    return text;
  } catch (err) {
    console.error("Error in runChat:", err);
    // return "⚠️ Something went wrong.";
  }
};
export default runChat;
