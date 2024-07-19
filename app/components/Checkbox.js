import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const Checkbox = ({ className = "", labelText, checked, onChange }) => {
  return (
    <div className={`flex flex-row items-center ${className}`} onClick={onChange} >
      <div className="border border-primary rounded w-5 h-5 flex justify-center items-center">
        <div className={`w-3 h-3 rounded-sm ${checked ? "bg-primary" : "bg-contrast"}`}></div>
      </div>
      <label onClick={onChange} className={`${montserrat.className} ml-3 uppercase py-1`}>{labelText}</label>
    </div>
  );
}

export default Checkbox;
