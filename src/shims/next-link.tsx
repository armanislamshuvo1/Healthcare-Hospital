import React from "react";
import { Link as RouterLink } from "react-router-dom";

export interface UrlObject {
  auth?: string | null;
  hash?: string | null;
  host?: string | null;
  hostname?: string | null;
  href?: string | null;
  pathname?: string | null;
  protocol?: string | null;
  search?: string | null;
  slashes?: boolean | null;
  port?: number | string | null;
  query?: string | null | Record<string, any>;
}

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string | UrlObject;
  as?: string | UrlObject;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
  children?: React.ReactNode;
}

function formatUrl(url: string | UrlObject | undefined | null): string {
  if (!url) return "";
  if (typeof url === "string") return url;

  const { pathname = "", search = "", hash = "", query } = url;
  let queryString = search || "";

  if (!queryString && query) {
    if (typeof query === "string") {
      queryString = query.startsWith("?") ? query : `?${query}`;
    } else if (typeof query === "object" && query !== null) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            for (const item of value) {
              params.append(key, String(item));
            }
          } else {
            params.append(key, String(value));
          }
        }
      }
      const qs = params.toString();
      queryString = qs ? `?${qs}` : "";
    }
  }

  const hashString = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : "";
  const finalQuery = queryString
    ? queryString.startsWith("?")
      ? queryString
      : `?${queryString}`
    : "";

  return `${pathname || ""}${finalQuery}${hashString}`;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    href,
    as: _as,
    replace,
    scroll: _scroll,
    shallow: _shallow,
    passHref: _passHref,
    prefetch: _prefetch,
    locale: _locale,
    legacyBehavior: _legacyBehavior,
    className,
    children,
    onClick,
    target,
    rel,
    ...rest
  },
  ref
) {
  const resolvedHref = React.useMemo(() => formatUrl(href), [href]);

  const isExternal = React.useMemo(() => {
    if (typeof resolvedHref !== "string") return false;
    const lower = resolvedHref.toLowerCase();
    return (
      lower.startsWith("http://") ||
      lower.startsWith("https://") ||
      lower.startsWith("tel:") ||
      lower.startsWith("mailto:") ||
      lower.startsWith("//") ||
      lower.startsWith("sms:") ||
      lower.startsWith("whatsapp:")
    );
  }, [resolvedHref]);

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={resolvedHref}
        className={className}
        onClick={onClick}
        target={target}
        rel={rel}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      ref={ref}
      to={resolvedHref || "/"}
      replace={replace}
      className={className}
      onClick={onClick}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </RouterLink>
  );
});

Link.displayName = "NextLinkShim";

export default Link;
