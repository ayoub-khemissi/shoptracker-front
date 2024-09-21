import Image from "next/image";
import SpinnerSvg from "../../public/assets/svg/icons/spinner.svg";

const Spinner = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <Image className="animate-spin" src={SpinnerSvg} alt="Loading spinner" />
    </div>
  );
};

export default Spinner;
