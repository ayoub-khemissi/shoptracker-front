const Separator = ({ className = "", type = "primary" }) => {
  return (
    <div
      className={`${type === "primary" ? "bg-primary" : "bg-contrast"} h-0.5 w-full ${className}`}
    ></div>
  );
};

export default Separator;
