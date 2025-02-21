"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import radioButtonsData from "@/utils/radioButtonsData";
import RadioButton from "@/components/RadioButton";

export default function Main() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting link:", link);
    setLoading(true);

    try {
      // First API call: Scrape the page
      const scrapeResponse = await axios.post(`/api/scrape`, { link, selectedTag: JSON.stringify(selectedTag) });
      console.log("Scraped Data:", scrapeResponse.data);

      if (!scrapeResponse.data || !scrapeResponse.data.filePath) {
        console.log("No valid data received from scraping");
        return;
      }

      setResponseData(scrapeResponse.data);

      // Second API call: Process the scraped data with AI
      const processResponse = await axios.post("/api/process", {
        filePath: scrapeResponse.data.filePath,
        userTag: selectedTag,
      });

      if (!processResponse.data || !processResponse.data.components) {
        console.log("No valid response received from AI processing");
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
    <div className="max-w-sm mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="link"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Enter Link
          </label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 w-full"
            placeholder="https://example.com"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Design"}
        </button>


      </form>
      

      {processedData && (
        <div className="mt-4 p-3 border bg-gray-100">
          <h3 className="font-bold">Generated Next.js Components:</h3>
          <pre className="text-sm">{processedData}</pre>
        </div>
      )}
    </div>
  );
}
