import { useState, useCallback } from "react";

interface IRequest {
  url: RequestInfo;
  method: RequestInit["method"];
  body?: Record<string, any>;
  token?: string;
}

export const useHttp = (): {
  loading: boolean;
  request: ({ method, url, body, token }: IRequest) => Promise<any>;
  error: string | null;
  removeError: () => void;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async ({ method, url, body, token }: IRequest) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
          ...(body ? { "Content-Type": "application/json" } : {}),
          ...(token ? { authorization: token } : {}),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      setError((error as { message: string }).message);
    }
  }, []);

  const removeError = useCallback(() => setError(null), []);

  return { loading, request, error, removeError };
};
