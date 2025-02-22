"use client";

import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";

export default function Home() {


  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-6 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-rows-3 gap-4">
        <div className="row-start-1 -mt-10">
            <Hero />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
