import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GPT4API, // Ensure this is set in .env
});

export async function POST(req) {
  try {
    const { message } = await req.json(); // Accept a message input

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Ensure you have access to this model
      messages: [{ role: "user", content: message }],
    });

    return new Response(JSON.stringify({ response: completion.choices[0].message.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
