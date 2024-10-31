"use client";

import Link from "next/link";
import ShopTrackerLogo from "./ShopTrackerLogo";
import NavLink from "./NavLink";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchLogout } from "@/modules/Fetch";
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useToast } from "../contexts/ToastContext";

const Header = () => {
  const { user, localLogout } = useAuthContext();
  const { showToast } = useToast();

  return (
    <header className="mb-6 flex flex-wrap items-center justify-center px-20 py-8 sm:justify-between lg:px-40">
      <nav className="flex w-full flex-wrap items-center justify-center text-nowrap sm:flex-nowrap">
        <Link className="pr-4" href="/">
          <ShopTrackerLogo />
        </Link>
        <NavLink className="px-8 text-xl" href="/pricing">
          Pricing
        </NavLink>
        <NavLink className="px-8 text-xl" href="/faq">
          FAQ
        </NavLink>
        {user ? (
          <>
            <NavLink className="px-8 text-xl" href="/tracker">
              Tracker
            </NavLink>
            <NavLink className="px-8 text-xl" href="/tracklist">
              Tracklist
            </NavLink>
            <Dropdown className="bg-contrast uppercase">
              <DropdownTrigger className="shrink-0 cursor-pointer">
                <Avatar
                  isBordered
                  src={"assets/img/logo-shoptracker.png"}
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
                    localLogout();
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <>
            <NavLink className="px-8 text-xl" href="/register">
              Sign Up
            </NavLink>
            <NavLink className="px-8 text-xl" href="/login">
              Sign In
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
