import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const Input = ({ className = "", labelText = null, type, placeholder, value, step, min, max, disabled = false, onChange }) => {
  let input;
  const classNames = `py-2 px-4 border-2 rounded-md border-primary bg-contrast placeholder-gray ${className}`;

  switch (type) {
    case "number":
      input = <input className={classNames} placeholder={placeholder} value={value} type={type} step={step} min={min} max={max} disabled={disabled} onChange={onChange} />;
      break;

    default:
      input = <input className={classNames} placeholder={placeholder} value={value} type={type} onChange={onChange} disabled={disabled} />;
      break;
  }

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {labelText &&
        <label className={`${montserrat.className} uppercase pb-1`}>{labelText}</label>
      }
      {input}
    </div>
  );
}

export default Input;
