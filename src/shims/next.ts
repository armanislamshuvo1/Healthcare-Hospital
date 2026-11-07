export namespace MetadataRoute {
  export type Sitemap = Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority?: number;
    alternates?: {
      languages?: Record<string, string>;
    };
    [key: string]: any;
  }>;

  export interface Robots {
    rules:
      | {
          userAgent?: string | string[];
          allow?: string | string[];
          disallow?: string | string[];
          crawlDelay?: number;
        }
      | Array<{
          userAgent?: string | string[];
          allow?: string | string[];
          disallow?: string | string[];
          crawlDelay?: number;
        }>;
    sitemap?: string | string[];
    host?: string;
    [key: string]: any;
  }

  export type Manifest = {
    background_color?: string;
    description?: string;
    dir?: "ltr" | "rtl" | "auto";
    display?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
    display_override?: string[];
    icons?: Array<{
      src: string;
      sizes?: string;
      type?: string;
      purpose?: "any" | "maskable" | "monochrome";
    }>;
    lang?: string;
    name?: string;
    orientation?:
      | "any"
      | "natural"
      | "landscape"
      | "portrait"
      | "portrait-primary"
      | "portrait-secondary"
      | "landscape-primary"
      | "landscape-secondary";
    prefer_related_applications?: boolean;
    related_applications?: Array<{
      platform: string;
      url: string;
      id?: string;
    }>;
    scope?: string;
    short_name?: string;
    start_url?: string;
    theme_color?: string;
    [key: string]: any;
  };
}

export interface Viewport {
  width?: string | number;
  height?: string | number;
  initialScale?: number;
  minimumScale?: number;
  maximumScale?: number;
  userScalable?: boolean;
  viewportFit?: "auto" | "cover" | "contain";
  interactiveWidget?: "resizes-visual" | "resizes-content" | "overlays-content";
  themeColor?: string | { media?: string; color: string }[];
  colorScheme?: "normal" | "light" | "dark" | "light dark" | "dark light" | "only light";
  [key: string]: any;
}

export interface Metadata {
  title?:
    | string
    | {
        default?: string;
        template?: string;
        absolute?: string;
      }
    | null;
  description?: string | null;
  keywords?: string | string[] | null;
  authors?: Array<{ name: string; url?: string | URL }> | null;
  creator?: string | null;
  publisher?: string | null;
  metadataBase?: URL | null;
  openGraph?: Record<string, any> | null;
  robots?: any;
  icons?: any;
  manifest?: string | URL | null;
  twitter?: Record<string, any> | null;
  alternates?: Record<string, any> | null;
  [key: string]: any;
}

const Next = {
  MetadataRoute: {} as any,
};

export default Next;
