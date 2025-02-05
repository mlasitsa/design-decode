import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { link } = await req.json(); 
    if (!link) return Response.json({ error: "Missing URL parameter" }, { status: 400 });

    const elements = await preprocessHTML(link);
    return Response.json({ elements }, { status: 200 });
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

    // Use Cheerio to parse HTML
    const $ = cheerio.load(html);
    const elements = [];

    // Extract all elements
    $('*').each((index, element) => {
      const tagName = element.tagName;
      const attributes = element.attribs; // Extract all attributes
      const content = $(element).html()?.trim() || ''; // Extract inner content (if any)

      // Push every tag into the elements array
      if (tagName == "script" | tagName == "link" | tagName == "animate") {
        return;
      } else {
        elements.push({ tagName, attributes, content });
      }
    });

    return elements; // Return the parsed elements
  } catch (error) {
    console.error('Error in preprocessing:', error);
    throw error; // Rethrow for handling
}
}