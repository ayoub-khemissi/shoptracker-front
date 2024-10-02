import Image from "next/image";
import SpinnerSvg from "../../public/assets/svg/icons/spinner.svg";

const Spinner = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <Image className="h-6 w-6 animate-spin" src={SpinnerSvg} alt="loading spinner" />
    </div>
  );
};

export default Spinner;
