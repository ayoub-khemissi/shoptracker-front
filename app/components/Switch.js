const Switch = ({ className = "", checked, onChange }) => {
  return (
    <div className={`${className} border border-primary rounded-full w-12 h-6 px-1 flex items-center ${checked ? "justify-end" : "justify-start"}`} onClick={onChange} >
      <div className={`rounded-full bg-primary w-4 h-4`}></div>
    </div>
  );
}

export default Switch;
