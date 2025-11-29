"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen mx-auto max-w-[692px] px-6 py-12 sm:py-16">
      {/* Hero Section */}
      <div className="flex flex-col gap-8">
        {/* Name and Title with Avatar */}
        <div className="flex items-center gap-4">
          {/* Avatar Circle */}
          <div className="size-11 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 flex-shrink-0 shadow-lg"></div>
          
          {/* Name and Title */}
          <div className="flex flex-col gap-0">
            <div className="text-base font-medium text-foreground leading-relaxed">
              Cameron Simony
            </div>
            <p className="text-base font-medium text-neutral-400 leading-relaxed -mt-1">
              Lead Product Designer at Kajabi
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 text-base text-neutral-400 leading-relaxed">
          <p>
            I'm currently a Lead Product Designer at Kajabi where I've driven & evolved the core platform experience over the last 8 years. I've designed the moments that define our product: 0–1 launches, systems that scale, and AI frameworks that change how people build businesses.
          </p>
          <p>
            I've also been a design partner to founders and startups at Iverson where I advise on product strategy and craft next-gen product experiences.
          </p>
        </div>
      </div>

      {/* Future sections will go here and automatically be within the centered column */}
    </main>
  );
}

