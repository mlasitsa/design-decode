## FINAL TECH STACK (NO VECTOR DB FOR NOW)
**Front-end:**
- **Next.js** – React framework for SSR & static generation.
- **JavaScript** – Primary language for the frontend.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **Framer Motion** – Animation library for smooth UI interactions.

Back-end & Processing:
- **OpenAI API** – Likely used for AI-driven HTML/CSS conversion.
- **Node.js** – Handles server-side operations.
- **Cheerio** – Parses and extracts HTML elements.
- **Puppeteer** – Automates browser tasks for scraping.
- **LangChain** – Framework for structured LLM responses (if used).
- **PostCSS** – Used on the backend to extract and process styles from scraped HTML.

# ScrapeIt

ScrapeIt is a project aimed at enhancing the efficiency of front-end development by automating the conversion of scraped HTML and CSS into reusable, responsive Next.js components styled with Tailwind CSS. By leveraging modern web scraping tools and AI-powered models, ScrapeIt empowers developers to focus on functionality and core features rather than repetitive design tasks.

## Features
- **Automated HTML & CSS Conversion**: Transform scraped HTML and CSS into responsive Next.js components styled with Tailwind CSS.
- **Design Scraping Flexibility**: Use Puppeteer and Cheerio to scrape designs from any website and integrate them seamlessly into projects.
- **AI-Powered Enhancements**: Leverage Hugging Face API and other AI models to intelligently process and generate component structures.
- **Focus on Reusability**: Output reusable components with meaningful class names, enabling consistent and maintainable front-end development.



## Past Notes

### Current Exploration (Might be changed)
- Fine-tuning the [CodeT5 model](https://huggingface.co/Salesforce/codet5) for HTML-to-component conversion. (approach will be changed)
- Exploring efficient ways to handle limited local storage by utilizing cloud-based solutions or lightweight models.
- Investigating alternatives to improve model outputs for generating accurate and reusable Next.js components.

## Limitations
- **Storage Constraints**: Limited local storage capacity prevents the use of larger models or datasets.
- **AI Model Accuracy**: Current models sometimes produce inconsistent outputs, requiring further fine-tuning and testing.
- **New to AI Integration**: This is my first project incorporating AI models into web development, leading to a steep learning curve for fine-tuning and deployment.
- **Limited Resources**: Exploring cost-effective or free solutions, such as Hugging Face API, to avoid reliance on expensive cloud platforms.

## Future Goals
1. Develop a streamlined pipeline to scrape, transform, and generate reusable components efficiently.
2. Enhance model accuracy to produce high-quality Next.js components styled with Tailwind CSS.
3. Expand the functionality to support additional frameworks and custom design preferences.

