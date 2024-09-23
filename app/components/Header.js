import Link from "next/link";
import ShopTrackerLogo from "./ShopTrackerLogo";
import NavLink from "./NavLink";

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-center px-20 py-6 sm:justify-between lg:px-40 lg:py-10">
      <div>
        <Link href="/">
          <ShopTrackerLogo />
        </Link>
      </div>
      <nav className="flex items-center justify-center space-x-4 sm:justify-end">
        <NavLink className="text-xl" href="/register">
          Sign Up
        </NavLink>
        <NavLink className="text-xl" href="/login">
          Sign In
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
