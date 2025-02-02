"use client";

import { useState } from "react";
import axios from "axios";

export default function Main() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [proccessedData, setProccessedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting link:", link);
  
    try {
      setLoading(true);
      
      // First API call: Scrape the page
      const scrapeResponse = await axios.post("/api/scrape", { link });
      console.log("Scraped Data:", scrapeResponse.data);
  
      if (!scrapeResponse.data) {
        console.log("No data received from scraping");
        return;
      }
  
      setResponseData(scrapeResponse.data);
      console.log("Response Data:", scrapeResponse.data);
  
      // Second API call: Process the scraped data with AI
      const processResponse = await axios.post("/api/process", scrapeResponse.data);
  
      setProccessedData(processResponse.data); 
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="link" className="block mb-2 text-sm font-bold text-gray-900">
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Design"}
        </button>
      </form>

      {proccessedData && (
        <div className="mt-4 p-3 border">
          <h3 className="font-bold">Response Data:</h3>
          <pre className="text-sm">{proccessedData}</pre>
        </div>
      )}
    </div>
  );
}
