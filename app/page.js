"use client";

import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import { Cards } from "@/components/Cards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content: Ensures it takes up space to push footer down */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="w-full max-w-5xl">
          <Hero />
        </div>
        <div className="w-full max-w-5xl mt-6">
          <Cards />
        </div>
      </main>


    </div>
  );
}
