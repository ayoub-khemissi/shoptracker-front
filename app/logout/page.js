"use client";

import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchLogout } from "@/modules/Fetch";
import { useToast } from "../contexts/ToastContext";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";

export default function Logout() {
  const { localLogout } = useAuthContext();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const response = await fetchLogout();

      switch (response?.status) {
        case 200:
          showToast("See you later 👋", "info");
          localLogout();
          break;

        default:
          showToast("Failed to logout. Please try again later.", "error");
          router.push("/");
          break;
      }
    };

    logout();
  }, [localLogout, router, showToast]);

  return (
    <>
      <title>Logout</title>
      <meta
        name="description"
        content="Logout page for ShopTracker. This page allows users to log out of their account."
      />
      <div className="h-full space-x-0 space-y-4 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:flex lg:space-x-20 lg:space-y-0 lg:px-40">
        <div className="flex w-full items-center justify-center">
          <Spinner className="h-12 w-12" />
        </div>
      </div>
    </>
  );
}
