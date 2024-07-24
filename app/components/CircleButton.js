const CircleButton = ({ children, className = "", onClick }) => {
  return (
    <button
      className={`m-0 flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-transparent p-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CircleButton;
