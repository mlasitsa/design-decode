import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { link } = await req.json(); // ✅ Extract URL from request body
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
    await browser.close(); // ✅ Always close the browser
  }
}

async function preprocessHTML(url) {
  try {
    const html = await scrapePage(url);
    const $ = cheerio.load(html);
    const elements = [];

    $("*").each((index, element) => {
      const tagName = element.tagName;
      const attributes = element.attribs;
      const content = $(element).html()?.trim() || "";

      if (tagName !== "script") {
        elements.push({ tagName, attributes, content });
      }
    });

    return elements;
  } catch (error) {
    console.error("Error in preprocessing:", error);
    throw error;
  }
}
