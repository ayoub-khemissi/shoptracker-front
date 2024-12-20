"use client";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const Checkbox = ({ className = "", labelText, checked, onClick = () => {} }) => {
  return (
    <div className={`flex flex-row items-center ${className}`} onClick={onClick}>
      <div className="flex h-5 w-5 items-center justify-center rounded border border-primary">
        <div className={`h-3 w-3 rounded-sm ${checked ? "bg-primary" : "bg-contrast"}`}></div>
      </div>
      <label onClick={onClick} className={`${montserrat.className} pl-3 uppercase`}>
        {labelText}
      </label>
    </div>
  );
};

export default Checkbox;
