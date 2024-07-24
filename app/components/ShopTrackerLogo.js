import { Lexend } from "next/font/google";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const ShopTrackerLogo = ({ className = "" }) => {
  return (
    <span className={`${lexend.className} text-3xl text-primary ${className}`}>
      Shop
      <span className="text-secondary transition duration-200 hover:text-tertiary">Tracker</span>.
    </span>
  );
};

export default ShopTrackerLogo;
