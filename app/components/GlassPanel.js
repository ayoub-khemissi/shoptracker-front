"use client";

import Image from "next/image";
import { useState } from "react";

const GlassPanel = ({
  imageSrc,
  imageAlt,
  imageHeight = "h-72",
  priority = false,
  className = "",
  primaryColor = "bg-secondary",
  secondaryColor = "bg-tertiary",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-primary/5 p-8 shadow-xl backdrop-blur-md ${className}`}
    >
      <div className="relative z-10">
        <Image
          className={`${imageHeight} w-auto transition-all duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
          src={imageSrc}
          alt={imageAlt}
          priority={priority}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>

      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className={`absolute right-0 top-0 h-1/2 w-1/2 -translate-y-1/4 translate-x-1/4 transform rounded-full ${primaryColor} blur-3xl transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-80"}`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 h-1/2 w-1/2 -translate-x-1/4 translate-y-1/4 transform rounded-full ${secondaryColor} blur-3xl transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-80"}`}
        ></div>
      </div>
    </div>
  );
};

export default GlassPanel;
