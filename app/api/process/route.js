import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ConversationTokenBufferMemory } from "langchain/memory"; // ✅ Memory restored

dotenv.config();

const chatModel = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "deepseek-r1-distill-qwen-32b",
});

// ✅ AI Memory to store conversation context
const memory = new ConversationTokenBufferMemory({
  memoryKey: "chat_history",
  returnMessages: true,
});

const CHUNK_SIZE = 6000; // Maximize token usage per request
const SLEEP_TIME = 60000; // 60 seconds (1 min) per request

export async function POST(req) {
  try {
    const { userTag } = await req.json();
    if (!userTag) return Response.json({ error: "Missing userTag parameter" }, { status: 400 });

    if (!process.env.GROQ_API) {
      return new Response(JSON.stringify({ error: "Missing Groq API key" }), { status: 500 });
    }

    const filePath = path.join(process.cwd(), "public", "scraped_content.json");
    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: "File not found" }), { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const filteredData = processFileContent(fileContent, userTag);

    if (filteredData.length === 0) {
      return new Response(JSON.stringify({ error: "No matching tag found" }), { status: 404 });
    }

    // **Step 1: Send Metadata & Initialize Memory**
    console.log("📤 Sending Metadata...");
    await chatModel.invoke([
      { role: "system", content: "Forget all previous tasks. You are an AI that converts HTML into modular React (Next.js) components using Tailwind CSS. Use best practices, extract meaningful content, and avoid unnecessary elements." },
      { role: "user", content: `Tag: ${filteredData[0].tagName}\nAttributes: ${JSON.stringify(filteredData[0].attributes, null, 2)}` }
    ], { memory });

    await sleep(SLEEP_TIME);

    // **Step 2: Send Content in Chunks (AI Memory Retains Context)**
    const contentChunks = chunkString(filteredData[0].content, CHUNK_SIZE);
    console.log(`📤 Sending ${contentChunks.length} chunks...`);

    for (let i = 0; i < contentChunks.length; i++) {
      console.log(`📤 Sending Part ${i + 1} of ${contentChunks.length}...`);
      await chatModel.invoke([
        { role: "user", content: `Part ${i + 1}:\n${contentChunks[i]}\n\nThis is part of the HTML. More parts are coming.` }
      ], { memory });
      await sleep(SLEEP_TIME);
    }

    // **Step 3: Final Request (Memory Retains Entire HTML)**
    console.log("✅ Final request: Generating Next.js components...");
    const completion = await chatModel.invoke([
      { role: "user", content: "Now, based on all previous chunks and tag information, generate modular, reusable React (Next.js) components." }
    ], { memory });

    console.log("📢 Groq API Response:", JSON.stringify(completion, null, 2));

    if (!completion || !completion.kwargs || !completion.kwargs.content) {
      throw new Error("AI response is empty or invalid.");
    }

    return new Response(JSON.stringify({ components: completion.kwargs.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Error processing file:", error);
    return new Response(JSON.stringify({ error: "Processing failed", details: error.message }), { status: 500 });
  }
}

// **Helper: Process File Content to Extract Specific Tag**
const processFileContent = (fileContent, userTag) => {
  const data = JSON.parse(fileContent);
  return data.filter(element => element.tagName === userTag);
};

// **Helper: Chunk String into 6000-Token Parts**
const chunkString = (str, size) => {
  const cleanedContent = str.replace(/\t|\n/g, ""); // Remove tabs & newlines
  const chunks = [];
  for (let i = 0; i < cleanedContent.length; i += size) {
    chunks.push(cleanedContent.slice(i, i + size));
  }
  return chunks;
};

// **Helper: Delay Between Requests (60s per request)**
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
