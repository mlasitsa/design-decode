import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ConversationChain } from "langchain/chains";
import { ConversationTokenBufferMemory } from "langchain/memory";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();

export async function POST(req) {

  const chatModel = new ChatOpenAI({
  apiKey: process.env.GPT4API,
  model: "gpt-4o-mini",
});

// const memory = new ConversationTokenBufferMemory({
//   memoryKey: "chat_history",
//   returnMessages: true,
// });


// const CHUNK_SIZE = 5000; 
// const SLEEP_TIME = 60000; 


  try {
    const { userTag, cssData } = await req.json();
    if (!userTag || !cssData) return Response.json({ error: "Missing userTag parameter" }, { status: 400 });

    if (!process.env.GPT4API) {
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

    // Send Metadata & Initialize Memory
    console.log("📤 Sending Metadata...");
    console.log("Your tag is:", userTag);
    console.log("Your elements are:", filteredData);
    console.log("Your css data is:", cssData)

    const formattedData = JSON.stringify(cssData, null, 2);

    console.log("AI readable data is: ", formattedData)
    
    const completion = await chatModel.invoke([
      { 
        role: "system", 
        content: "Forget all previous tasks. You are an AI that converts HTML into modular React (Next.js) components using Tailwind CSS, you will have css styles provided and you need to convert them into tailwind sytax, pay attention to html tag class and then find all possible styling on that tag and convert it using css data provided, dont make up stuff or using something custom, user wont have arefernece to stylesheet you have, so you need to do it perfect. Use best practices, extract meaningful content, and avoid unnecessary elements."
      },

      { 
        role: "user",
      //    content: `Tag: ${filteredData[0].tagName}\nAttributes: ${JSON.stringify(filteredData[0].attributes, null, 2)}\nHTML: ${filteredData.content} \n Action:
      // Now, based on all html and tag information, generate modular, reusable React (Next.js) components. At the very end, provide output of what I have sent` 
        content: `This is the data you need to work with: ${filteredData[0].content}. And this is the tag you need to work with: ${filteredData[0].tagName} and this is the stylesheet references of the items that are used in this html elements: ${formattedData}. AT THE VERY END GIVE ME MY CSSDATA THAT I HAVE GIVEN TO YOU`
      }
    ]);

    // await sleep(SLEEP_TIME);

    // // Send Content in Chunks (AI Memory DOES NOT Retains Context)
    // const contentChunks = chunkString(filteredData[0].content, CHUNK_SIZE);
    // console.log(`📤 Sending ${contentChunks.length} chunks...`);

    // for (let i = 0; i < contentChunks.length; i++) {
    //   console.log(`📤 Sending Part ${i + 1} of ${contentChunks.length}...`);
    //   await chatModel.invoke([
    //     { role: "user", content: `Part ${i + 1}:\n${contentChunks[i]}\n\nThis is part of the HTML. More parts are coming.` }
    //   ], { memory });
    //   await sleep(SLEEP_TIME);
    // }


    // Final step
    // console.log("✅ Final request: Generating Next.js components...");
    // const completion = await chatModel.invoke([
    //   { role: "user", content: "Now, based on all previous chunks and tag information, generate modular, reusable React (Next.js) components. Also please tell me how many messages I have sent" }
    // ], { memory });

    console.log("📢 Open AI API Response:", JSON.stringify(completion, null, 2));

    // Check if the response is valid
    if (!completion) {
      console.error("Invalid or empty response from Groq API:", JSON.stringify(completion, null, 2));
      throw new Error("AI response is empty or invalid.");
    }

    const responseContent = completion.content;

    return new Response(JSON.stringify({ components: responseContent }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Error processing file:", error);
    return new Response(JSON.stringify({ error: "Processing failed", details: error.message }), { status: 500 });
  }
}

// Helper Functions
const processFileContent = (fileContent, userTag) => {
  const data = JSON.parse(fileContent);
  return data.filter(element => element.tagName === userTag);
};

const chunkString = (str, size) => {
  const words = str.split(" "); 
  let chunks = [];
  let currentChunk = "";

  for (let word of words) {
    word.replace(/\s+/g, " ");
    if ((currentChunk + word).length > size) {
      chunks.push(currentChunk.trim()); 
      currentChunk = "";
    }
    currentChunk += word + " ";
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim()); 
  }

  return chunks;
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
