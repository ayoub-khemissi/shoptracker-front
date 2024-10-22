"use client";

import Image from "next/image";
import SpinnerSvg from "../../public/assets/svg/icons/spinner.svg";

const Spinner = ({ className = "" }) => {
  return <Image className={`animate-spin ${className}`} src={SpinnerSvg} alt="loading spinner" />;
};

export default Spinner;
