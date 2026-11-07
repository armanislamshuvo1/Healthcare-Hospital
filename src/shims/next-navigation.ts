import React from "react";
import {
  useLocation,
  useNavigate,
  useParams as useReactRouterParams,
} from "react-router-dom";

export function usePathname(): string {
  const location = useLocation();
  return location.pathname;
}

export interface AppRouterInstance {
  back(): void;
  forward(): void;
  refresh(): void;
  push(href: string, options?: { scroll?: boolean }): void;
  replace(href: string, options?: { scroll?: boolean }): void;
  prefetch(href: string): void;
}

export function useRouter(): AppRouterInstance {
  const navigate = useNavigate();

  return React.useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => {
        navigate(0);
      },
      push: (href: string, options?: { scroll?: boolean }) => {
        navigate(href);
        if (options?.scroll !== false && typeof window !== "undefined") {
          window.scrollTo(0, 0);
        }
      },
      replace: (href: string, options?: { scroll?: boolean }) => {
        navigate(href, { replace: true });
        if (options?.scroll !== false && typeof window !== "undefined") {
          window.scrollTo(0, 0);
        }
      },
      prefetch: (_href: string) => {
        // No-op in client-side Vite SPA
      },
    }),
    [navigate]
  );
}

export function useSearchParams(): URLSearchParams {
  const location = useLocation();
  return React.useMemo(() => new URLSearchParams(location.search), [location.search]);
}

export function useParams<
  T extends Record<string, string | string[] | undefined> = Record<string, string>
>(): T {
  return useReactRouterParams() as T;
}

export function useServerInsertedHTML(_callback: () => React.ReactNode): void {
  // No-op in client SPA
}

export function useSelectedLayoutSegment(): string | null {
  return null;
}

export function useSelectedLayoutSegments(): string[] {
  return [];
}

export function redirect(url: string): never {
  if (typeof window !== "undefined") {
    window.location.replace(url);
  }
  throw new Error(`NEXT_REDIRECT: ${url}`);
}

export function notFound(): never {
  throw new Error("NEXT_NOT_FOUND");
}

export type ReadonlyURLSearchParams = URLSearchParams;
