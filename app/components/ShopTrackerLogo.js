import { Lexend } from "next/font/google";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const ShopTrackerLogo = () => {
  return (
    <h2 className={`${lexend.className} text-primary text-3xl`}>Shop<span className="text-secondary hover:text-tertiary transition duration-300">Tracker</span>.</h2>
  );
}

export default ShopTrackerLogo;
