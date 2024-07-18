import { Lexend } from "next/font/google";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const ShopTrackerLogo = ({ className }) => {
  return (
    <span className={`${lexend.className} text-primary text-3xl ${className}`}>Shop<span className="text-secondary hover:text-tertiary transition duration-200">Tracker</span>.</span>
  );
}

export default ShopTrackerLogo;
