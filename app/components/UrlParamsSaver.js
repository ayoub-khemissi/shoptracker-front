"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Constants from "@/utils/Constants";

const { URL_PARAMS_TO_SAVE } = Constants;

const UrlParamsSaver = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    for (const param of URL_PARAMS_TO_SAVE) {
      const value = searchParams.get(param);

      if (value) {
        localStorage.setItem(param, value);
      }
    }
  }, [pathname, searchParams]);

  return null;
};

export default UrlParamsSaver;
