"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import TextNormal from "./TextNormal";
import EyeShowSvg from "../../public/assets/svg/icons/eye-show.svg";
import EyeHideSvg from "../../public/assets/svg/icons/eye-hide.svg";
import Image from "next/image";
import InvisibleButton from "./InvisibleButton";

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
  disabled,
  required,
  pattern = null,
  errorText = null,
  isError = false,
  onChange = () => {},
  ref = null,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isSearch = type === "search";

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
        <input
          id={id}
          name={id}
          className={`w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 pl-4 pr-10 text-primary transition-all duration-300 ${
            isError ? "border-error text-error" : "border-primary text-primary"
          } ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-white/30 focus:border-secondary/50 focus:bg-white/10"}`}
          value={value}
          type={isPassword && showPassword ? "text" : type}
          onChange={onChange}
          {...(placeholder && { placeholder: placeholder })}
          {...(pattern && { pattern: pattern })}
          {...(step && { step: step })}
          {...(disabled && { disabled: disabled })}
          {...(required && { required: required, "aria-required": required })}
          {...(min && { min: min })}
          {...(max && { max: max })}
          {...(labelText && { "aria-labelledby": `label-${id}` })}
          {...(isSearch && { "aria-label": "Search" })}
          {...(ref && { ref: ref })}
        />
        {isPassword && (
          <InvisibleButton
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform"
          >
            <Image
              className="h-6 w-6"
              title={showPassword ? "Hide password" : "Show password"}
              src={showPassword ? EyeHideSvg : EyeShowSvg}
              alt="show hide password"
            />
          </InvisibleButton>
        )}
        {isSearch && <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">🔎</div>}
      </div>
      {isError && errorText && <TextNormal className="text-sm text-error">{errorText}</TextNormal>}
    </div>
  );
};

export default Input;
