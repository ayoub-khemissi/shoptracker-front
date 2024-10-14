"use client";

import Link from "next/link";
import ShopTrackerLogo from "./ShopTrackerLogo";
import NavLink from "./NavLink";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchLogout } from "@/modules/Fetch";
import ShoptrackerIconSvg from "../../public/assets/svg/icons/shoptracker-icon.svg";
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useToast } from "../contexts/ToastContext";

const Header = () => {
  const { user, localLogout } = useAuthContext();
  const { showToast } = useToast();

  return (
    <header className="flex flex-wrap items-center justify-center px-20 py-8 sm:justify-between lg:px-40">
      <div className="my-1">
        <Link href="/">
          <ShopTrackerLogo />
        </Link>
      </div>
      <nav className="flex flex-wrap items-center justify-center sm:flex-nowrap">
        {user ? (
          <>
            <NavLink className="my-1 px-8 text-xl" href="/tracker">
              Tracker
            </NavLink>
            <NavLink className="my-1 px-8 text-xl" href="/tracklist">
              Tracklist
            </NavLink>
            <Dropdown className="my-1 bg-contrast px-8 uppercase">
              <DropdownTrigger className="cursor-pointer">
                <Avatar
                  isBordered
                  src={user.photo ? user.photo : ShoptrackerIconSvg}
                  width={48}
                  height={48}
                  alt="profile picture"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="settings">
                  <Link href="/settings">Settings</Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className={`text-error`}
                  color="danger"
                  onClick={async () => {
                    const response = await fetchLogout();

                    if (!response || response.status !== 200) {
                      showToast("Failed to logout. Please try again later.", "error");
                      return;
                    }

                    showToast("See you later 👋", "info");
                    await localLogout();
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <>
            <NavLink className="my-1 px-8 text-xl" href="/register">
              Sign Up
            </NavLink>
            <NavLink className="my-1 px-8 text-xl" href="/login">
              Sign In
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
