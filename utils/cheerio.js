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
      if (tagName != "script") {
        elements.push({ tagName, attributes, content });
      }
    });

    return elements; // Return the parsed elements
  } catch (error) {
    console.error('Error in preprocessing:', error);
    throw error; // Rethrow for handling
  }
}

module.exports = { preprocessHTML };
