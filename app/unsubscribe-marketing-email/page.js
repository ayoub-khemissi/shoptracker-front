"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchData } from "@/modules/Fetch";
import { useToast } from "../contexts/ToastContext";
import { useAuthContext } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/LoadingScreen";
import { useEffect } from "react";

export default function UnsubscribeMarketingEmail() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { user, saveUser } = useAuthContext();
  const router = useRouter();

  const token = searchParams.get("token") || null;

  useEffect(() => {
    const handleUpdateMarketingEmail = async () => {
      const response = await fetchData("/update/marketing/email", "PATCH", {
        token: token,
        enabled: false,
      });

      switch (response?.status) {
        case 200:
          user.marketing_email = false;
          saveUser(user);
          showToast("You have been unsubscribed from marketing emails.", "info");
          break;

        case 400:
        case 401:
          showToast("Invalid token, please try again.", "error");
          break;

        case 404:
        default:
          showToast(
            "Failed to unsubscribe from marketing emails. Please try again later.",
            "error",
          );
          break;
      }

      router.push("/");
    };

    handleUpdateMarketingEmail();
  }, [token, router, user, saveUser, showToast]);

  return (
    <>
      <title>Unsubscribe | ShopTracker</title>
      <meta
        name="description"
        content="Unsubscribe from ShopTracker. This page allows you to unsubscribe from ShopTracker."
      />
      <LoadingScreen />
    </>
  );
}
