"use client";

import { useState } from "react";
import Image from "next/image";

interface PopoverLinkProps {
  href: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  popover: {
    imageSrc: string;
    imageAlt: string;
    background?: string;
    glow?: string;
  };
  highlightColor?: string;
  underlineSpacing?: string;
  verticalAlign?: string;
  underlineWidth?: string;
}

export default function PopoverLink({
  href,
  logo,
  popover,
  highlightColor = "#FF757A",
  underlineSpacing = "2px",
  verticalAlign = "-2px",
  underlineWidth = "calc(100% + 2px)",
}: PopoverLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Remove # from hex color for SVG
  const highlightColorHex = highlightColor.replace("#", "");

  return (
    <span
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popover */}
      <span
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2
          pointer-events-none select-none
          transition-all duration-[150ms] ease-out
          ${isHovered 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-2"
          }
        `}
        style={{ 
          marginBottom: "10px",
          filter: isHovered ? "blur(0px)" : "blur(16px)",
        }}
      >
        {/* Popover card */}
        <span 
          className="relative block w-[200px] h-[120px] rounded-xl overflow-hidden transition-[box-shadow] duration-[150ms]"
          style={{
            boxShadow: `
              0px 0px 0px 1px rgba(255, 255, 255, 0.06),
              0px 1px 2px -1px rgba(0, 0, 0, 0.3),
              0px 2px 4px 0px rgba(0, 0, 0, 0.2),
              0px 8px 16px -4px rgba(0, 0, 0, 0.4)
            `
          }}
        >
          {/* Image */}
          <img
            src={popover.imageSrc}
            alt={popover.imageAlt}
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        </span>
      </span>

      {/* Logo with underline */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-block"
        style={{ verticalAlign }}
        aria-label={`${logo.alt} - Visit website`}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="block"
        />
        {/* Dotted underline - default state */}
        <span
          className={`
            absolute h-[2px]
            transition-opacity duration-[150ms]
            ${isHovered ? "opacity-0" : "opacity-100"}
          `}
          style={{
            top: "100%",
            left: "0",
            width: underlineWidth,
            marginTop: underlineSpacing,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='2' viewBox='0 0 4 2'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23a3a3a3' fill-opacity='0.7'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "left center",
          }}
        />
        {/* Dotted underline - hover state */}
        <span
          className={`
            absolute h-[2px]
            transition-opacity duration-[150ms]
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          style={{ 
            top: "100%",
            left: "0",
            width: underlineWidth,
            marginTop: underlineSpacing,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='2' viewBox='0 0 4 2'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23${highlightColorHex}'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "left center",
          }}
        />
      </a>
    </span>
  );
}
