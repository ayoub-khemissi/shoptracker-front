import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const TextImportant = ({ children, className = "" }) => {

  return (
    <p className={`${montserrat.className} uppercase ${className}`}>{children}</p>
  );
}

export default TextImportant;
