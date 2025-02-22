"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["amazing", "new", "wonderful", "beautiful", "smart"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full px-4">
      <div className="container mx-auto">
        <div className="flex gap-6 sm:gap-8 py-12 sm:py-20 lg:py-40 items-center justify-center flex-col text-center">
          {/* Article Link Button */}
          <div>
            <Link href="/some-article">
              <Button variant="secondary" size="sm" className="gap-4">
                Read our launch article <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Animated Title */}
          <div className="flex flex-col gap-4 max-w-[90%] sm:max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-regular tracking-tighter">
              <span className="text-spektr-cyan-50">This is something</span>
              <span className="relative flex w-full justify-center overflow-hidden md:pb-4 md:pt-1 min-h-[50px]">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -50 : 50, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-[90%] sm:max-w-2xl">
              Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>

          {/* CTA Buttons - Responsive Layout */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[90%] sm:max-w-none justify-center">
            <Button size="lg" className="gap-4 w-full sm:w-auto" variant="outline">
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4 w-full sm:w-auto">
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
