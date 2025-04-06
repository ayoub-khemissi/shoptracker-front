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
      <NavLink className="w-full text-center text-2xl" href="/pricing" onClick={closeMenu}>
        Pricing
      </NavLink>
      <NavLink className="w-full text-center text-2xl" href="/faq" onClick={closeMenu}>
        FAQ
      </NavLink>
      {user ? (
        <>
          <NavLink className="w-full text-center text-2xl" href="/tracker" onClick={closeMenu}>
            Tracker
          </NavLink>
          <NavLink className="w-full text-center text-2xl" href="/tracklist" onClick={closeMenu}>
            Tracklist
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className="w-full py-4 text-center text-2xl"
            href="/register"
            onClick={closeMenu}
          >
            Sign Up
          </NavLink>
          <NavLink className="w-full py-4 text-center text-2xl" href="/login" onClick={closeMenu}>
            Sign In
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 flex h-14 flex-wrap items-center justify-between bg-white/30 px-6 py-2 backdrop-blur-md dark:bg-black/30 md:px-12 lg:-mt-14 lg:px-28">
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
                  await fetchLogout();
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
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-0 z-50 flex min-h-screen w-full flex-col items-center justify-center bg-background/95 backdrop-blur-md lg:hidden">
          <InvisibleButton
            className="absolute right-6 top-6 text-3xl focus:outline-none"
            onClick={toggleMenu}
          >
            ✕
          </InvisibleButton>
          <nav className="flex h-full w-full flex-col items-center justify-center gap-y-1 space-y-6 px-6 py-8">
            <Link href="/" onClick={closeMenu}>
              <ShopTrackerLogo className="h-16 w-auto" />
            </Link>
            <NavItems />
          </nav>
        </div>
      )}
      <div className="hidden h-full scale-75 lg:flex lg:w-full lg:items-center lg:justify-between">
        <div className="mr-4">
          <Link href="/" onClick={closeMenu}>
            <ShopTrackerLogo />
          </Link>
        </div>
        <nav className="flex items-center justify-end gap-x-12">
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
                    await fetchLogout();
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
    </header>
  );
};

export default Header;
