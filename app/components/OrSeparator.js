import Separator from "./Separator";
import Subtitle from "./Subtitle";

const OrSeparator = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Separator type="primary" className="rounded-full" />
      <Subtitle className="px-2">Or</Subtitle>
      <Separator type="primary" className="rounded-full" />
    </div>
  );
}

export default OrSeparator;