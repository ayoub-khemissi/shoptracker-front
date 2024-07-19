const InvisibleButton = ({ children, className = "", onClick }) => {
  return (
    <button className={`bg-transparent border-none p-0 m-0 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default InvisibleButton;
