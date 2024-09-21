import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const Input = ({
  id,
  className = "",
  labelText = null,
  type,
  placeholder,
  value,
  step,
  min,
  max,
  disabled = false,
  required = false,
  onChange = () => {},
}) => {
  const classNames = `py-2 px-4 border-2 rounded-md border-primary bg-contrast placeholder-gray ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <div className={`flex flex-col ${className}`}>
      {labelText && (
        <label id={`label-${id}`} htmlFor={id} className={`${montserrat.className} pb-1 uppercase`}>
          {labelText}
        </label>
      )}
      <input
        id={id}
        name={id}
        className={classNames}
        placeholder={placeholder}
        value={value}
        type={type}
        step={step}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-required={required}
        {...(min && { min: min })}
        {...(max && { max: max })}
        {...(labelText && { "aria-labelledby": `label-${id}` })}
      />
    </div>
  );
};

export default Input;
