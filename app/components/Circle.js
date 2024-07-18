const Circle = ({ children, className }) => {
  return (
    <div className={`${className} border border-primary rounded-full w-12 h-12 flex justify-center items-center`}>{children}</div>
  );
}

export default Circle;
