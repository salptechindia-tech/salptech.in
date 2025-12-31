
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getProjectConsultation = async (details: string) => {
  if (!API_KEY) return "AI Consultation is currently unavailable. Please contact us directly.";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a senior digital consultant at SalpTech. A client provided these project details: "${details}". Provide a brief, professional initial strategy (3-4 sentences) and estimate a complexity level (Low, Medium, High). Format the output as plain text.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });

    return response.text || "I've analyzed your request and we'd love to discuss it further. A consultant will reach out shortly.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Thank you for your interest! We've received your inquiry and our team will analyze it manually.";
  }
};
