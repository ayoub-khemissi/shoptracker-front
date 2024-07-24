const Switch = ({ className = "", checked, onChange }) => {
  return (
    <div
      className={`flex w-14 items-center justify-center rounded-full border border-primary p-0.5 transition-transform duration-300 ${className}`}
      onClick={onChange}
    >
      <div
        className={`transform rounded-full bg-primary p-2.5 transition-transform duration-300 ${checked ? "translate-x-3/4" : "-translate-x-3/4"}`}
      ></div>
    </div>
  );
};

export default Switch;
