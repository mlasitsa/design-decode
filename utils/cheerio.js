const { scrapePage } = require('../utils/puppeteer'); // Import Puppeteer scrape function
const cheerio = require('cheerio');

// Function to preprocess HTML
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

async function getCssStles(url) {
  try {
    
    const html = await scrapePage(url);

    // Use Cheerio to parse HTML
    const $ = cheerio.load(html);
    const styles = [];

    $("link[rel='stylesheet']").each((i, el) => {
      styles.push($(el).attr("href")); // Get the href attribute
    });

    return styles;
} catch (error) {
  console.error('Error in getting styles:', error);
  throw error;
}
}

module.exports = { preprocessHTML, getCssStles };
