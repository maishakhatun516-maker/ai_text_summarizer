
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function listModels() {
  try {
    const response = await ai.models.list();

    console.log("\nAvailable Gemini Models:\n");

    for await (const model of response) {
      console.log("Model:", model.name);
      console.log("Methods:", model.supportedActions);
      console.log("-------------------------");
    }
  } catch (error) {
    console.error("Error fetching models:", error.message);
  }
}

listModels();
