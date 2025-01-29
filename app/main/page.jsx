"use client"

import React, { useEffect } from 'react'
import { useState } from 'react';
import { scrapePage } from '@/utils/puppeteer';
import { preprocessHTML } from '@/utils/cheerio';

const Main = () => {
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

      const handleSubmit = async(e, link) => {
        e.preventDefault();
        console.log("Link submitted:", link);

        try {
          setLoading(true);
          const html = await scrapePage(link);
          const elements = await preprocessHTML(html);
          console.log("Elements:", elements);

        } catch {
          console.error("Error scraping the page:", error);
        }
        finally {
          setLoading(false);
        }
      }
    }, [link]);

    const handleSubmit = (e, link) => {
      e.preventDefault();
      console.log("Link submitted:", link);
      // Add logic here to handle the submitted link
    };

  
    return (
      <form onSubmit={(e) => {handleSubmit(e, link)}} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="link"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Enter Link
          </label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://example.com"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Get Design
        </button>
      </form>
    );
  }

export default Main