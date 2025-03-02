import React from "react";


import Link from 'next/link';

const TestComponent = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      <div className="ac-gf-content px-4 py-5 mx-auto max-w-7xl">
        <h2 className="absolute clip w-0 h-0 overflow-hidden">Apple Footer</h2>
        
        <section className="border-b border-gray-300 py-4">
          <ul className="list-none">
            <li className="mb-2">
              <span id="footnote-1" className="text-sm leading-5">
                1. Hearing Aid and Hearing Test: The Hearing Aid feature has received FDA authorization...
                <br />
                <Link href="https://support.apple.com/120850" target="_blank" rel="nofollow" className="text-blue-600 underline">
                  support.apple.com/120850
                </Link> for total attenuation and more information...
              </span>
            </li>
            <li className="mb-2">
              <span id="footnote-2" className="hidden sm:block text-sm leading-5">
                2. Trade‑in values will vary based on the condition
              </span>
            </li>
            <li className="mb-2">To access and use all Apple Card features...</li>
            <li className="mb-2">If you reside in the U.S. territories, please call...</li>
            <li className="mb-2">
              Learn more about how Apple Card applications are evaluated at{' '}
              <Link href="https://support.apple.com/kb/HT209218" className="text-blue-600 underline">support.apple.com/kb/HT209218</Link>.
            </li>
            <li className="hidden">
              <span className="text-sm">
                Major League Baseball trademarks and copyrights are used with permission...
              </span>
            </li>
            <li className="mb-2">Apple Intelligence is available in beta on all iPhone 16 models, iPhone 15 Pro...</li>
            <li className="mb-2">
              <span className="font-medium">A subscription is required for Apple Arcade, Apple Fitness+, Apple Music, and Apple TV+.</span>
            </li>
            <li className="mb-2">Features are subject to change....</li>
          </ul>
        </section>

        <nav className="flex flex-wrap pt-4">
          <div className="flex-1 min-w-full md:min-w-0 md:w-1/5">
            <div className="relative">
              <h3 className="font-semibold text-sm mb-2">Shop and Learn</h3>
              <ul className="list-none">
                <li className="mb-2">
                  <Link href="/us/shop/goto/store" className="py-2 block text-gray-700 hover:text-blue-600">Store</Link>
                </li>
                {/* Add other links similarly */}
                <li className="mb-2">
                  <Link href="/mac/" className="py-2 block text-gray-700 hover:text-blue-600">Mac</Link>
                </li>
                <li className="mb-2">
                  <Link href="/ipad/" className="py-2 block text-gray-700 hover:text-blue-600">iPad</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Repeat for other sections */}
        </nav>

        <section className="py-5 text-center">
          <div className="text-gray-600">
            More ways to shop: <Link href="/retail/" className="text-blue-600 underline">Find an Apple Store</Link> or <Link href="https://locate.apple.com/" className="text-blue-600 underline">other retailer</Link> near you. {' '}
            Or call <Link href="tel:1-800-692-7753" className="text-blue-600 underline">1-800-MY-APPLE</Link>.
          </div>
          <div className="mt-2">
            <Link href="/choose-country-region/" className="text-sm" title="Choose your country or region">United States</Link>
          </div>
        </section>

        <div className="border-t border-gray-300 mt-5 pt-4">
          <div className="text-sm text-gray-400">Copyright © 2025 Apple Inc. All rights reserved.</div>
          <ul className="mt-2 list-none">
            <li className="inline-block mr-2 last:mr-0">
              <Link href="/legal/privacy/" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link>
            </li>
            <li className="inline-block mr-2 last:mr-0">
              <Link href="/legal/internet-services/terms/site.html" className="text-gray-600 hover:text-blue-600">Terms of Use</Link>
            </li>
            <li className="inline-block mr-2 last:mr-0">
              <Link href="/us/shop/goto/help/sales_refunds" className="text-gray-600 hover:text-blue-600">Sales and Refunds</Link>
            </li>
            <li className="inline-block mr-2 last:mr-0">
              <Link href="/legal/" className="text-gray-600 hover:text-blue-600">Legal</Link>
            </li>
            <li className="inline-block">
              <Link href="/sitemap/" className="text-gray-600 hover:text-blue-600">Site Map</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default TestComponent;