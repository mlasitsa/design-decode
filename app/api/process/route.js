import OpenAI from "openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.GPT4API }); 

export async function POST(req) {
  try {
    // Step 1: Check if OpenAI API key is set
    if (!process.env.GPT4API) {
      return new Response(JSON.stringify({ error: "Missing OpenAI API key" }), { status: 500 });
    }

    // Step 2: Read the HTML file
    const filePath = path.join(process.cwd(), "public", "scraped_content.json");

    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: "File not found" }), { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");

    // Step 3: Send request to OpenAI for conversion
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Convert the given HTML structure into reusable Next.js components. 
          - Use functional components with Tailwind CSS.
          - Ensure components are properly named and structured.
          - If you detect repeating patterns, extract them into reusable components.
          - Format output as proper Next.js components.`,
        },
        { role: "user", content: `Here is the HTML:\n${fileContent}` },
      ],
    });

    return new Response(JSON.stringify({ components: completion.choices[0].message.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error processing file:", error);
    return new Response(JSON.stringify({ error: "Processing failed", details: error.message }), { status: 500 });
  }
}
