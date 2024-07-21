const CircleButton = ({ children, className = "", onClick }) => {
  return (
    <button className={`flex justify-center items-center bg-transparent rounded-full border-primary border p-3 m-0 w-14 h-14 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default CircleButton;
