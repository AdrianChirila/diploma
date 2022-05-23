import { useCallback } from "react";

export const useMessage = () =>
  useCallback((message: string) => {
    if (window.M) {
      window.M.toast({ html: message });
    }
  }, []);
