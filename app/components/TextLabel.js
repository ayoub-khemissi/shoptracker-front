import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const TextLabel = ({ children, className = "" }) => {
  return <label className={`${montserrat.className} uppercase ${className}`}>{children}</label>;
};

export default TextLabel;
