"use client";

import Separator from "./Separator";
import Subtitle from "./Subtitle";

const TextSeparator = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Separator type="primary" className="rounded-full" />
      <Subtitle className="text-nowrap px-2 text-center">{children}</Subtitle>
      <Separator type="primary" className="rounded-full" />
    </div>
  );
};

export default TextSeparator;
