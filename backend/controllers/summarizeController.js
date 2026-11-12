
import ai from "../config/gemini.js";

export const summarizeText = async (req, res) => {
  try {
    // 1. Receive text from frontend
    const { text } = req.body;

    // 2. Check empty input
    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter some text to summarize.",
      });
    }

    // 3. Check text length
    if (text.length > 50000) {
      return res.status(413).json({
        success: false,
        message: "Text is too long. Maximum 50000 characters allowed.",
      });
    }

    // 4. Send text to Gemini
    const prompt = `
      You are an expert text summarizer.

      Summarize the following text.
      Keep the main ideas and important information.
      Use simple and clear language.
      Do not add information that is not in the original text.

      TEXT:
      ${text}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    // 5. Get summarized result
    const summary = response.text;

    if (!summary) {
      throw new Error("No summary was generated.");
    }

    // 6. Send result to frontend
    return res.status(200).json({
      success: true,
      summary: summary,
    });

  } catch (error) {
    console.error("Summarization Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to summarize text. Please try again.",
    });
  }
};
