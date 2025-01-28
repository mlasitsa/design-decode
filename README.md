## Updates (01/20/2025)
Most likely will be moving away from using HuggingFace for this project
**Reasons**
- HuggingFace Auto Train costs money
- Wasnt able to find good **SMALL** model for code generation that provides clear input
- Cannot manually train using Google Colab due to RAM constraints (even little model)
- Cannot download model on my computer since I dont have enough memory ( I have pretty weak laptop unfortunately )

**Proposals**
- Will try to use OpenAi API, but website DOM is huge so it will cost a lot of tokens
- To reduce tokens usage I will prompt user for which specific part of the website he wants to get jsx tailwind component
- **Issue**: custom classes -> **Solution** I will find a link tag with a ref of stylesheet and get the href, then get acess to css file and will look for tags names that are in class property (hopefully it makes sense)

## Updates (01/26/2025) 
Trying out deepseek model which is less than 10GB from huggingface so I can run if on HF server 
Deepseek little model seems working fine as of now

More update to come soon
# ScrapeIt

ScrapeIt is a project aimed at enhancing the efficiency of front-end development by automating the conversion of scraped HTML and CSS into reusable, responsive Next.js components styled with Tailwind CSS. By leveraging modern web scraping tools and AI-powered models, ScrapeIt empowers developers to focus on functionality and core features rather than repetitive design tasks.

## Features
- **Automated HTML & CSS Conversion**: Transform scraped HTML and CSS into responsive Next.js components styled with Tailwind CSS.
- **Design Scraping Flexibility**: Use Puppeteer and Cheerio to scrape designs from any website and integrate them seamlessly into projects.
- **AI-Powered Enhancements**: Leverage Hugging Face API and other AI models to intelligently process and generate component structures.
- **Focus on Reusability**: Output reusable components with meaningful class names, enabling consistent and maintainable front-end development.

## Tech Stack
- **JavaScript**: Core language for Puppeteer and Cheerio for web scraping.
- **Python**: Used for integrating and fine-tuning AI models.
- **Node.js**: Backend server to handle scraping and processing workflows.
- **Tailwind CSS**: Styling framework for generating clean, responsive designs.
- **Hugging Face API**: Provides the AI-powered models to analyze and convert design data.

## Current Exploration (Might be changed)
- Fine-tuning the [CodeT5 model](https://huggingface.co/Salesforce/codet5) for HTML-to-component conversion.
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

