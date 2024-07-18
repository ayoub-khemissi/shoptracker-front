const Switch = ({ className, checked, onChange }) => {
  return (
    <div className={`border border-primary rounded-full p-0.5 w-14 flex justify-center items-center transition-transform duration-300 ${className}`} onClick={onChange} >
      <div className={`rounded-full bg-primary p-2.5 transform transition-transform duration-300 ${checked ? 'translate-x-3/4' : '-translate-x-3/4'}`} ></div>
    </div>
  );
}

export default Switch;
