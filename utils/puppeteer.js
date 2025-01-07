const puppeteer = require('puppeteer');

// Function to scrape a webpage
async function scrapePage(url) {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the provided URL
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Extract the page content (HTML)
    const html = await page.content();

    // Close the browser
    await browser.close();

    // Return the HTML
    return html;
  } catch (error) {
    console.error('Error scraping the page:', error);
    await browser.close();
    throw error; // Rethrow the error for handling by the API route
  }
}

module.exports = { scrapePage };
