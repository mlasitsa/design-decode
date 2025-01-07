const { scrapePage } = require('../utils/puppeteer');

(async () => {
  const url = 'https://www.apple.com/'; // URL to scrape

  try {
    const html = await scrapePage(url); // Call scrapePage with the test URL
    console.log(html); // Log the HTML content to ensure it works
  } catch (error) {
    console.error('Error during test:', error); // Catch and log any errors
  }
})();
