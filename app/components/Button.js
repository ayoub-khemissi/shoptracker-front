const Button = ({
  children,
  className = "",
  onClick = () => {},
  type = "primary",
  locked = false,
  defaultCursor = false,
}) => {
  let typeClass;

  switch (type) {
    case "primary":
      typeClass = `border-primary text-contrast bg-primary ${locked ? "" : "hover:text-primary hover:bg-contrast"}`;
      break;

    case "tertiary":
      typeClass = `border-tertiary text-primary bg-tertiary ${locked ? "" : "hover:border-secondary hover:text-contrast hover:bg-secondary"}`;
      break;

    case "contrast":
      typeClass = `border-primary text-primary bg-contrast ${locked ? "" : "hover:text-contrast hover:bg-primary"}`;
      break;
  }

  return (
    <button
      className={`${typeClass} text-nowrap rounded-full border-2 px-5 py-2 text-sm font-semibold uppercase transition duration-200 ${defaultCursor ? "cursor-default" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
