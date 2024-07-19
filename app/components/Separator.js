const Separator = ({ className, type = "primary" }) => {
  return (
    <div className={`${type === "primary" ? "bg-primary" : "bg-contrast"} w-full h-0.5 ${className}`}></div>
  );
}

export default Separator;
