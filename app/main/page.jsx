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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First API call: Scrape the page
      const scrapeResponse = await axios.post(`/api/scrape`, {
        link,
        selectedTag: JSON.stringify(selectedTag),
      });

      if (!scrapeResponse.data || !scrapeResponse.data.filePath) {
        return;
      }

      setResponseData(scrapeResponse.data);

      // Second API call: Process the scraped data with AI
      const processResponse = await axios.post("/api/process", {
        filePath: scrapeResponse.data.filePath,
        userTag: selectedTag,
      });

      if (!processResponse.data || !processResponse.data.components) {
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
        <Typewriter text={"Just sit back and let AI to take care of it"}/>
        </span>
        <span className="text-white-600">
          <Description text={"As of right now our AI Bot takes some time to process content and generate outputs. Also, as real human our AI friend isnt perfect yet and still can make mistake, so please dont be too harsh. Meanwhile, try to play with it by pasting the link in the input field, select part of the website you need to get scraped and simply sit back and let our AI to handle boring work for you!!!"}/>
        </span>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Field */}
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-semibold text-gray-700"
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
            <p className="text-sm font-medium text-gray-700">Select a Tag:</p>
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
        <div className="mt-6 w-full max-w-2xl bg-gray-100 border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Generated Next.js Components:
          </h3>
          <pre className="bg-white p-3 text-gray-700 text-sm rounded-md overflow-x-auto">
            {processedData}
          </pre>
        </div>
      )}
    </div>
  );
}
