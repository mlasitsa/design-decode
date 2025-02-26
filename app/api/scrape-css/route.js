import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ConversationChain } from "langchain/chains";
import { ConversationTokenBufferMemory } from "langchain/memory";
import { ChatOpenAI } from "@langchain/openai";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";


export async function POST(req) {
  try {
      
      const { link } = await req.json();
      if (!link) return Response.json({ error: "Missing URLS" }, { status: 400 });

      // This function will be used to find root link and attach other links that reference stylesheets
      //const fullLink = processLink(link);

      const loader = new CheerioWebBaseLoader(link);
        
    
      const docs = await loader.load();
      console.log(docs);
      
      
      console.log("DOCS COntent is",docs[0].pageContent);
      console.log("Filtered Docs", filteredDocs);

      return Response.json({ docs }, { status: 200 });
  } catch (error) {
      console.error("Error:", error);
      return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
  
  
  
  // try {
  //   const { link } = await req.json();
  //   if ( link ) return Response.json({ error: "Missing URLS" }, { status: 400 });

  //   const elements = await preprocessHTML(link);
  //   return Response.json({ elements }, { status: 200 });
  // } catch (error) {
  //   console.error("Error:", error);
  //   return Response.json({ error: "Something went wrong" }, { status: 500 });
  // }
}

function getRootDomain(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin; // Returns protocol + root domain (e.g., https://www.apple.com)
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}