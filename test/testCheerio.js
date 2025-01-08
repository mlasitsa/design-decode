const { preprocessHTML } = require('../utils/cheerio'); // Import the Cheerio function

(async () => {
  const url = 'https://www.apple.com/'; // URL to scrape

  try {
    const elements = await preprocessHTML(url); // Call preprocessHTML with the test URL
    console.log(JSON.stringify(elements, null, 2)); // Log parsed elements to verify the output
  } catch (error) {
    console.error('Error during test:', error); // Catch and log any errors
  }
})();
