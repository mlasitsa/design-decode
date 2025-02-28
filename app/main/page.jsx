"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import radioButtonsData from "@/utils/radioButtonsData";
import RadioButton from "@/components/RadioButton";
import Typewriter from "@/components/ui/typewriter";
import Description from "@/components/ui/description";

export default function Main() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const H1text = `
  As of right now our <strong>AI Bot</strong> takes some time to process content and generate outputs. 
  <strong>Also, as real human our AI friend isn't perfect yet and still can make mistake, 
  so please don't be too harsh.</strong> Meanwhile, try to play with it by pasting the link 
  in the input field, <strong>select part of the website</strong> you need to get 
  scraped and simply sit back and <strong>let our AI handle boring work for you!!!</strong>
`

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProcessedData(null)

    try {
      // First API call: Scrape the page
      const scrapeResponse = await axios.post(`/api/scrape`, {
        link,
        selectedTag: JSON.stringify(selectedTag),
      });

      if (!scrapeResponse.data || !scrapeResponse.data.filePath) {
        console.log('I FAILED ON STEP 1')
        return;
      }

      setResponseData(scrapeResponse.data);
      console.log("RECEIVED FROM CALL:", scrapeResponse.data)
      const { cssLinks, elements } = scrapeResponse.data

      // Second API call: Get CSS id and css classes styles
      const cssStyle = await axios.post("/api/scrape-css", {
        link: link,
        cssLinks: cssLinks,
        userTag: selectedTag,
        htmlData: elements
      })

      if (!cssStyle.data || !cssStyle.data.extractedStyles) {
        console.log("I FAILED ON STEP 2");
        return;  // Stop execution if there's an error
      }

      const finalCss = cssStyle.data.extractedStyles

      // Final API call: Process the scraped data with AI
      const processResponse = await axios.post("/api/process", {
        filePath: scrapeResponse.data.filePath,
        userTag: selectedTag,
        cssData: finalCss
      });

      if (!processResponse.data || !processResponse.data.components) {
        console.log('DATA ISNT THERE')
        return;
      }

      setProcessedData(processResponse.data.components);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTag !== null) {
      console.log("Updated Selected Tag:", selectedTag);
    }
  }, [selectedTag]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16 py-12">
      
      {/* Header */}
      <div className="flex flex-col items-center gap-5 mt-16">
        <span className="inline-block text-white-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center">
          Just sit back and let AI to {""}
          <br/>
        <Typewriter text={["process it", "generate it", "take care of it"]}/>
        </span>
        <span className="text-white-600">
          <Description text={H1text}/>
        </span>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Field */}
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-semibold text-white-700"
            >
              Enter Website Link
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
              required
            />
          </div>

          {/* Radio Buttons */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-white-700">Select a Tag:</p>
            {radioButtonsData.map((data) => (
              <RadioButton
                key={data.buttonName}
                buttonName={data.buttonName}
                tag={data.tag}
                selected={JSON.stringify(selectedTag)}
                onChange={(e) => setSelectedTag(JSON.parse(e.target.value))}
              />
            ))}
          </div>

          {/* <div>
            <p className="text-sm font-medium text-white-700">THIS IS TEST CSS BUTTON</p>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
              onClick={() => scrapeLink(link)}
              >
            
              Test Button
            </button>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Design"}
          </button>
        </form>
      </div>

      {/* Processed Data Output */}
      {processedData && (
        <div className="mt-8 w-full max-w-2xl bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-5 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-white">Generated Next.js Components:</h3>
            <button
              onClick={() => navigator.clipboard.writeText(processedData)}
              className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition"
            >
              Copy
            </button>
          </div>
          <pre className="bg-gray-800 p-4 text-sm rounded-md overflow-x-auto max-h-72">
            <code className="whitespace-pre-wrap break-words">{processedData}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
