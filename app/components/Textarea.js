"use client";

import { Montserrat } from "next/font/google";
import TextNormal from "./TextNormal";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const Textarea = ({
  id,
  className = "",
  labelText = null,
  placeholder,
  value,
  disabled,
  required,
  rows = 4,
  errorText = null,
  isError = false,
  onChange = () => {},
  ref = null,
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {labelText && (
        <label
          id={`label-${id}`}
          htmlFor={id}
          className={`${montserrat.className} uppercase ${isError ? "text-error" : "text-primary"}`}
        >
          {labelText}
        </label>
      )}
      <div className="relative">
        <textarea
          id={id}
          name={id}
          className={`w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-primary transition-all duration-300 ${
            isError ? "border-error text-error" : "border-primary text-primary"
          } ${
            disabled
              ? "cursor-not-allowed opacity-50"
              : "hover:border-white/30 focus:border-secondary/50 focus:bg-white/10"
          }`}
          value={value}
          onChange={onChange}
          rows={rows}
          {...(placeholder && { placeholder: placeholder })}
          {...(disabled && { disabled: disabled })}
          {...(required && { required: required, "aria-required": required })}
          {...(labelText && { "aria-labelledby": `label-${id}` })}
          {...(ref && { ref: ref })}
        />
      </div>
      {isError && errorText && <TextNormal className="text-sm text-error">{errorText}</TextNormal>}
    </div>
  );
};

export default Textarea;
