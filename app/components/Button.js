const Button = ({ children, className = "", onClick, type = "primary", defaultCursor = false }) => {
  let typeClass;

  switch (type) {
    case "primary":
      typeClass = `border-primary text-contrast bg-primary hover:text-primary hover:bg-contrast`;
      break;

    case "tertiary":
      typeClass = `border-tertiary text-primary bg-tertiary hover:border-secondary hover:text-contrast hover:bg-secondary`;
      break;

    case "contrast":
      typeClass = `border-primary text-primary bg-contrast hover:text-contrast hover:bg-primary`;
      break;
  }

  return (
    <button className={`${typeClass} uppercase font-semibold px-5 py-2 text-sm border-2 transition duration-200 rounded-full ${defaultCursor ? "cursor-default" : ""} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
