import DitheredSphere from "@/components/DitheredSphere";
import PopoverLink from "@/components/PopoverLink";

export default function Home() {
  return (
    <main className="min-h-screen mx-auto max-w-[692px] px-6 py-12 sm:py-16">
      {/* Hero Section */}
      <div className="flex flex-col gap-8 mt-12">
        {/* Name and Title with Avatar */}
        <div className="flex items-center gap-4">
          {/* Dithered Sphere WebGL */}
          <DitheredSphere size={44} />
          
          {/* Name and Title */}
          <div className="flex flex-col gap-0">
            <div className="text-base font-medium text-foreground leading-relaxed">
              Cam Simony
            </div>
            <p className="text-base font-medium text-neutral-400 leading-relaxed -mt-1">
              Design & code
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 text-base text-neutral-400 leading-relaxed">
          <p>
            I'm currently a Staff Product Designer at{" "}
            <PopoverLink
              href="https://kajabi.com"
              logo={{
                src: "/kajabi-logo.svg",
                alt: "Kajabi",
                width: 68,
                height: 16,
              }}
              popover={{
                imageSrc: "/kajabi-hover-image.png",
                imageAlt: "Kajabi",
              }}
              highlightColor="#FF757A"
            />{" "}
            where I've driven & evolved the core platform experience over the last 8 years. I've designed the moments that define our product: 0–1 launches, systems that scale, and AI frameworks that change how people build businesses.
          </p>
          <p>
            I've also been a design partner to founders and startups at{" "}
            <PopoverLink
              href="https://iverson.inc"
              logo={{
                src: "/iverson-logo.svg",
                alt: "Iverson",
                width: 64,
                height: 8,
              }}
              popover={{
                imageSrc: "/iverson-logo.svg",
                imageAlt: "Iverson",
              }}
              highlightColor="#00FE7F"
              underlineSpacing="4px"
              verticalAlign="-1px"
              underlineWidth="100%"
            />{" "}
            where I advise on product strategy and craft next-gen product experiences.
          </p>
        </div>
      </div>

      {/* Future sections will go here and automatically be within the centered column */}
    </main>
  );
}

