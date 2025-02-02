import dotenv from "dotenv";

dotenv.config();

const apiToken = process.env.HUGGINGFACE_TOKEN;
if (!apiToken) {
  throw new Error("API token not found. Please add HUGGINGFACE_TOKEN to .env.local.");
}

const modelName = "deepseek-ai/deepseek-coder-1.3b-base";
const apiUrl = `https://api-inference.huggingface.co/models/${modelName}`;


export async function POST(req) {
    try {
      const body = await req.json(); 
      const elements = body.elements;
  
      if (!elements || elements.length === 0) {
        return new Response(JSON.stringify({ error: "No elements found." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const taskDescription = `
        Convert the given HTML elements into reusable React components styled with Tailwind CSS.
        Ensure each element is properly structured into components.
      `;
  
      const inputText = `${taskDescription}\n${JSON.stringify(elements)}`;
  
      // Send data to Hugging Face API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: inputText }),
      });
  
      if (!response.ok) {
        return new Response(JSON.stringify({ error: `Hugging Face API error: ${response.status} ${response.statusText}` }), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const output = await response.json();
  
      if (output && output[0] && output[0].generated_text) {
        return new Response(JSON.stringify({ jsx: output[0].generated_text.trim() }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify({ error: "No JSX output found in response." }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
  
    } catch (error) {
      return new Response(JSON.stringify({ error: `Request failed: ${error.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  