"use client";

const Button = ({
  children,
  className = "",
  onClick = () => {},
  type = "primary",
  locked = false,
  buttonType = "button",
  defaultCursor = false,
  disabled = false,
  key,
}) => {
  let typeClass;

  switch (type) {
    case "primary":
      typeClass = `border-primary text-contrast bg-primary shadow-lg
        ${locked ? "" : "hover:text-primary hover:bg-contrast hover:shadow-primary/20 hover:scale-105"}`;
      break;

    case "secondary":
      typeClass = `border-secondary text-contrast bg-secondary shadow-lg
        ${locked ? "" : "hover:border-tertiary hover:text-primary hover:bg-tertiary hover:shadow-tertiary/20 hover:scale-105"}`;
      break;

    case "tertiary":
      typeClass = `border-tertiary text-primary bg-tertiary shadow-lg
        ${locked ? "" : "hover:border-secondary hover:text-contrast hover:bg-secondary hover:shadow-secondary/20 hover:scale-105"}`;
      break;

    case "quaternary":
      typeClass = `border-quaternary text-primary bg-quaternary shadow-lg
        ${locked ? "" : "hover:text-quaternary hover:bg-contrast hover:shadow-quaternary/20 hover:scale-105"}`;
      break;

    case "contrast":
      typeClass = `border-primary text-primary bg-contrast shadow-lg
        ${locked ? "" : "hover:text-contrast hover:bg-primary hover:shadow-primary/20 hover:scale-105"}`;
      break;
  }

  return (
    <button
      type={buttonType}
      className={`${typeClass} rounded-xl border px-5 py-2.5 text-center text-sm font-semibold uppercase backdrop-blur-sm transition-all duration-300 ${defaultCursor ? "cursor-default" : ""} ${disabled ? "cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      {...(disabled && { disabled: disabled })}
      {...(key && { key: key })}
    >
      {children}
    </button>
  );
};

export default Button;
