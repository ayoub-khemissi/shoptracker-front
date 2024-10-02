const InvisibleButton = ({ children, className = "", onClick = () => {} }) => {
  return (
    <button
      type="button"
      className={`m-0 border-none bg-transparent p-0 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default InvisibleButton;
