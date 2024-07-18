const Switch = ({ className, checked, onChange }) => {
  return (
    <div className={`${className} border border-primary rounded-full p-1 w-12 flex justify-center items-center transition-transform duration-300`} onClick={onChange} >
      <div className={`rounded-full bg-primary p-2 transform transition-transform duration-300 ${checked ? 'translate-x-3/4' : '-translate-x-3/4'}`} ></div>
    </div>
  );
}

export default Switch;
