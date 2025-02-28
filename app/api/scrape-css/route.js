import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import postcss from "postcss";
import * as cheerio from "cheerio";


export async function POST(req) {
    try {
        const { link, cssLinks, userTag, htmlData } = await req.json();
        if (!link || !cssLinks || !userTag || !htmlData) {
            return Response.json({ error: "Missing data" }, { status: 400 });
        }

        const rootLink = getRootDomain(link);
        let extractedStyles = {};
        let cssElements = extractCssElements(userTag, htmlData); // Find relevant classes & IDs

        for (let i = 0; i < cssLinks.length; i++) {
            const fullCssUrl = new URL(cssLinks[i], rootLink).href;
            console.log(`Fetching CSS from: ${fullCssUrl}`);

            const loader = new CheerioWebBaseLoader(fullCssUrl);
            const doc = await loader.load();
            const cssContent = doc[0]?.pageContent || "";
            if (!cssContent) continue;

            // Parse CSS using PostCSS
            const parsedCSS = postcss.parse(cssContent);

            // Extract relevant styles
            parsedCSS.walkRules((rule) => {
                cssElements.forEach((element) => {
                    if (rule.selector.includes(element)) {
                        if (!extractedStyles[element]) {
                            extractedStyles[element] = [];
                        }
                        extractedStyles[element].push(rule.toString());
                    }
                });
            });
        }

        console.log("Extracted Styles:", extractedStyles);
        return Response.json({ extractedStyles }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}

function getRootDomain(url) {
    try {
        return new URL(url).origin;
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
}

// Extract classes & IDs from htmlData based on userTag
function extractCssElements(userTag, htmlDataArray) {
  let cssElements = [];

  // Filter the array to find objects that match the userTag
  const matchingElements = htmlDataArray.filter(element => element.tagName === userTag);

  // Loop through all matched elements
  matchingElements.forEach(htmlData => {
      // Extract from the main tag
      if (htmlData.attributes?.id) {
          cssElements.push(`#${htmlData.attributes.id}`);
      }
      if (htmlData.attributes?.class) {
          cssElements = cssElements.concat(
              htmlData.attributes.class.split(" ").map(cls => `.${cls}`)
          );
      }

      // Parse inner HTML content with Cheerio
      if (htmlData.content) {
          const $ = cheerio.load(htmlData.content); // Load raw HTML content
          $("*").each((_, element) => {
              const tagId = $(element).attr("id");
              const tagClass = $(element).attr("class");

              if (tagId) cssElements.push(`#${tagId}`);
              if (tagClass) {
                  cssElements = cssElements.concat(tagClass.split(" ").map(cls => `.${cls}`));
              }
          });
      }
  });

  // Remove duplicates
  cssElements = [...new Set(cssElements)];

  console.log("CSS ELEMENTS FROM EXTRACT ARE:", cssElements);
  return cssElements;
}
