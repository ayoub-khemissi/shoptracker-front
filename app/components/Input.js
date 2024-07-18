import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const Input = ({ className = "", labelText = null, type, placeholder, value, onChange }) => {
  return (
    <div className={`${className} flex flex-col`}>
      {labelText &&
        <label className={`${montserrat.className} uppercase py-1`}>{labelText}</label>
      }
      <input className="py-2 px-4 border-2 rounded border-primary bg-contrast placeholder-gray" placeholder={placeholder} value={value} type={type} onChange={onChange} />
    </div>
  );
}

export default Input;
