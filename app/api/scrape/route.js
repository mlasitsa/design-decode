import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { link } = await req.json(); 
    if (!link) return Response.json({ error: "Missing URL parameter" }, { status: 400 });

    const elements = await preprocessHTML(link);

    const filePath = path.join(process.cwd(), "public", "scraped_content.json");

    // Write data to a JSON file
    fs.writeFileSync(filePath, JSON.stringify(elements, null, 2));

    return Response.json({ filePath }, { status: 200 });
    

  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

async function scrapePage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    return await page.content();
  } catch (error) {
    console.error("Error scraping the page:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function preprocessHTML(url) {
  try {
    // Get HTML from Puppeteer
    const html = await scrapePage(url);
    const tagSet = new Set(["nav", "footer", "header", "main"]);


    // Use Cheerio to parse HTML
    const $ = cheerio.load(html);
    const elements = [];
    const cssLink = [];

    // Extract all elements
    $('*').each((index, element) => {
      const tagName = $(element).prop("tagName")?.toLowerCase().trim(); 
      const attributes = element.attribs; 
      const content = $(element).html()?.trim() || ''; 
    
      if (tagSet.has(tagName)) {
        elements.push({ tagName, attributes, content });
      }

     // if tag name == link and rel == stylesheet, we push it ro cssLink since we need these link for styles
      if (tagName == "link" && attributes.rel === "stylesheet") {
          if (attributes.href) {
           cssLink.push(attributes.href);
          }     
        } 
      

    });
      console.log("Extracted Elements Before Writing:", elements);
    

    return elements; // Return the parsed elements
  } catch (error) {
    console.error('Error in preprocessing:', error);
    throw error; 
}
}