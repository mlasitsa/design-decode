const { preprocessHTML } = require('../utils/cheerio'); // Import the Cheerio function
const {getCssStles} = require('../utils/cheerio');

(async () => {
  const url = 'https://www.apple.com/'; // URL to scrape

  try {
    const elements = await preprocessHTML(url); // Call preprocessHTML with the test URL
    const styles = await getCssStles(url);
    console.log(JSON.stringify(elements, null, 2)); // Log parsed elements to verify the output
    console.log(JSON.stringify(styles, null, 2));
  } catch (error) {
    console.error('Error during test:', error); // Catch and log any errors
  }
})();
