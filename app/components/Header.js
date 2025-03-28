"use client";

import Link from "next/link";
import { useState } from "react";
import ShopTrackerLogo from "./ShopTrackerLogo";
import NavLink from "./NavLink";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchLogout } from "@/modules/Fetch";
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useToast } from "../contexts/ToastContext";
import InvisibleButton from "./InvisibleButton";

const Header = () => {
  const { user, localLogout } = useAuthContext();
  const { showToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const NavItems = () => (
    <>
      <Link className="lg:hidden" href="/" onClick={closeMenu}>
        <ShopTrackerLogo />
      </Link>
      <NavLink className="px-8 text-xl" href="/pricing" onClick={closeMenu}>
        Pricing
      </NavLink>
      <NavLink className="px-8 text-xl" href="/faq" onClick={closeMenu}>
        FAQ
      </NavLink>
      {user ? (
        <>
          <NavLink className="px-8 text-xl" href="/tracker" onClick={closeMenu}>
            Tracker
          </NavLink>
          <NavLink className="px-8 text-xl" href="/tracklist" onClick={closeMenu}>
            Tracklist
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className="px-8 text-xl" href="/register" onClick={closeMenu}>
            Sign Up
          </NavLink>
          <NavLink className="px-8 text-xl" href="/login" onClick={closeMenu}>
            Sign In
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="mb-6 flex flex-wrap items-center justify-between px-4 py-4 sm:px-6 md:px-20 lg:px-40">
      <div className="flex w-full items-center justify-between lg:hidden">
        <InvisibleButton className="text-2xl focus:outline-none" onClick={toggleMenu}>
          ☰
        </InvisibleButton>
        <Link href="/" onClick={closeMenu}>
          <ShopTrackerLogo />
        </Link>
        {user ? (
          <Dropdown className="bg-contrast uppercase">
            <DropdownTrigger className="shrink-0 cursor-pointer">
              <Avatar
                isBordered
                src={"assets/img/logo-shoptracker.png"}
                width={40}
                height={40}
                alt="profile picture"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="settings">
                <Link href="/settings" onClick={closeMenu}>
                  Settings
                </Link>
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
                  closeMenu();
                }}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div></div>
        )}
      </div>
      <div className="hidden lg:flex lg:w-full lg:items-center">
        <div className="mr-4">
          <Link href="/" onClick={closeMenu}>
            <ShopTrackerLogo />
          </Link>
        </div>
        <nav className="flex grow items-center justify-end">
          <NavItems />
          {user && (
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
                  <Link href="/settings" onClick={closeMenu}>
                    Settings
                  </Link>
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
                    closeMenu();
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </nav>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background bg-opacity-95 lg:hidden">
          <InvisibleButton
            className="absolute right-4 top-4 text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            ✕
          </InvisibleButton>
          <nav className="flex flex-col items-center space-y-6 py-8">
            <NavItems />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
