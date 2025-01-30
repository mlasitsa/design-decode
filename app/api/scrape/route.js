import { NextApiRequest, NextApiResponse } from "next";
import { scrapePage } from "@/utils/puppeteer";
import { preprocessHTML } from "@/utils/cheerio";

export async function GET(req, res) {
    const { searchParams } = new URL(req.url, "http://localhost:3000"); // Extract query params
    const url = searchParams.get("url"); // ✅ Get URL from query string
  
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }
  
    try {
      // Get HTML from Puppeteer
      const html = await scrapePage(url);
  
      // Use Cheerio to parse HTML
      const $ = cheerio.load(html);
      const elements = [];
  
      // Extract all elements
      $("*").each((index, element) => {
        const tagName = element.tagName;
        const attributes = element.attribs; // Extract all attributes
        const content = $(element).html()?.trim() || ""; // Extract inner content (if any)
  
        if (tagName !== "script") {
          elements.push({ tagName, attributes, content });
        }
      });
  
      res.status(200).json({ elements });
    } catch (error) {
      console.error("Error in preprocessing:", error);
      res.status(500).json({ error: "Error preprocessing HTML" });
    }
  }
  


