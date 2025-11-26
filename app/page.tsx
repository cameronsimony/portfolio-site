"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-6xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Your product design portfolio starts here
        </p>
      </motion.div>
    </main>
  );
}

