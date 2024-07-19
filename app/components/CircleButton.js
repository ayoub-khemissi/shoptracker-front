const CircleButton = ({ children, className = "", onClick }) => {
  return (
    <button className={`bg-transparent rounded-full border-primary border p-3 m-0 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default CircleButton;
