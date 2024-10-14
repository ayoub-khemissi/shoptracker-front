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

      if (!response || response.status !== 200) {
        showToast("Failed to logout. Please try again later.", "error");
        router.push("/");
        return;
      }

      showToast("See you later 👋", "info");
      await localLogout();
    };

    logout();
  }, [localLogout, router, showToast]);

  return (
    <div className="h-full space-x-0 space-y-4 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:flex lg:space-x-20 lg:space-y-0 lg:px-40">
      <div className="flex w-full items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}