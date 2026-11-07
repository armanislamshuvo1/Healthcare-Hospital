import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const require = createRequire(import.meta.url);
const CACHE_DIR = path.resolve("./node_modules/.cache/test-shims");
const LINK_CJS_PATH = path.join(CACHE_DIR, "next-link.cjs");

describe("Adversarial Challenger Suite: Shims Stress Testing", () => {
  let LinkShim;
  let nextNavigation;

  before(async () => {
    // 1. Transpile next-link.tsx for in-memory Node testing
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    const linkSource = fs.readFileSync(path.resolve("./src/shims/next-link.tsx"), "utf-8");
    const transpiled = ts.transpileModule(linkSource, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.React,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    });
    fs.writeFileSync(LINK_CJS_PATH, transpiled.outputText);
    const linkModule = require(LINK_CJS_PATH);
    LinkShim = linkModule.default || linkModule.Link;

    // 2. Load next-navigation.ts natively
    nextNavigation = await import("../src/shims/next-navigation.ts");
  });

  after(() => {
    try {
      if (fs.existsSync(LINK_CJS_PATH)) {
        fs.unlinkSync(LINK_CJS_PATH);
      }
    } catch {
      // Ignore cache cleanup errors
    }
  });

  // =========================================================================
  // 1. next/link SHIM ADVERSARIAL STRESS
  // =========================================================================
  describe("1. next/link Adapter Stress Matrix", () => {
    const renderLink = (props, initialEntry = "/") => {
      return renderToString(
        React.createElement(
          MemoryRouter,
          { initialEntries: [initialEntry] },
          React.createElement(LinkShim, props, props.children || "Test Link")
        )
      );
    };

    describe("1.1 String Path Variations", () => {
      it("renders internal root link correctly", () => {
        const html = renderLink({ href: "/" });
        assert.match(html, /^<a\s+[^>]*href="\/"[^>]*>Test Link<\/a>$/);
      });

      it("renders internal page paths correctly", () => {
        const paths = ["/about", "/doctor", "/services", "/appointment", "/contact", "/privacy-policy", "/admin"];
        for (const p of paths) {
          const html = renderLink({ href: p });
          assert.match(html, new RegExp(`href="${p}"`));
        }
      });

      it("preserves URL query strings and search params in string hrefs", () => {
        const html = renderLink({ href: "/appointment?doctor=amin&date=2026-11-01" });
        assert.match(html, /href="\/appointment\?doctor=amin&amp;date=2026-11-01"/);
      });

      it("preserves URL hash fragments in string hrefs", () => {
        const html = renderLink({ href: "/#how-to-visit" });
        assert.match(html, /href="\/?#how-to-visit"/);
      });

      it("preserves combined query params and hash in string hrefs", () => {
        const html = renderLink({ href: "/doctor?specialty=cardiology#chamber" });
        assert.match(html, /href="\/doctor\?specialty=cardiology#chamber"/);
      });
    });

    describe("1.2 External & Protocol Link Delegation", () => {
      it("delegates tel: protocol URLs to native anchor tags", () => {
        const telNumbers = [
          "tel:01600000000",
          "tel:+8801600000000",
          "tel:01712345678",
          "TEL:01600000000", // uppercase protocol
        ];
        for (const tel of telNumbers) {
          const html = renderLink({ href: tel, className: "btn-phone" });
          assert.match(html, new RegExp(`href="${tel.replace(/\+/g, "\\+")}"`, "i"));
          assert.match(html, /class="btn-phone"/);
        }
      });

      it("delegates mailto: protocol URLs to native anchor tags", () => {
        const emails = [
          "mailto:info@healthcarehospital.com",
          "mailto:emergency@healthcarehospital.com?subject=Inquiry",
          "MAILTO:contact@hospital.org",
        ];
        for (const mailto of emails) {
          const html = renderLink({ href: mailto });
          assert.match(html, new RegExp(`href="${mailto.replace(/\?/g, "\\?")}"`, "i"));
        }
      });

      it("delegates external HTTP/HTTPS URLs to native anchor tags", () => {
        const externals = [
          "https://maps.google.com/?q=Chattogram",
          "http://example.com/portal",
          "//cdn.example.com/lib.js",
          "HTTPS://WWW.PEERLESSHOSPITAL.COM",
        ];
        for (const ext of externals) {
          const html = renderLink({ href: ext });
          assert.match(html, new RegExp(`href="${ext.replace(/[?//]/g, "\\$&")}"`, "i"));
        }
      });

      it("delegates sms: and whatsapp: messaging protocol links", () => {
        const messaging = [
          "sms:01600000000",
          "whatsapp:+8801600000000",
          "SMS:01700000000",
        ];
        for (const msg of messaging) {
          const html = renderLink({ href: msg });
          assert.match(html, new RegExp(`href="${msg.replace(/\+/g, "\\+")}"`, "i"));
        }
      });
    });

    describe("1.3 UrlObject Parsing & Serialization Stress", () => {
      it("formats UrlObject with pathname only", () => {
        const html = renderLink({ href: { pathname: "/services" } });
        assert.match(html, /href="\/services"/);
      });

      it("formats UrlObject with pathname and query object", () => {
        const html = renderLink({
          href: {
            pathname: "/appointment",
            query: { dept: "cardiology", doctor: "amin" },
          },
        });
        assert.match(html, /href="\/appointment\?dept=cardiology&amp;doctor=amin"/);
      });

      it("formats UrlObject with query string (with and without leading '?')", () => {
        const html1 = renderLink({
          href: { pathname: "/doctor", query: "chamber=201" },
        });
        assert.match(html1, /href="\/doctor\?chamber=201"/);

        const html2 = renderLink({
          href: { pathname: "/doctor", query: "?chamber=201" },
        });
        assert.match(html2, /href="\/doctor\?chamber=201"/);
      });

      it("formats UrlObject with array query parameters", () => {
        const html = renderLink({
          href: {
            pathname: "/search",
            query: { tags: ["medicine", "cardiology"] },
          },
        });
        assert.match(html, /href="\/search\?tags=medicine&amp;tags=cardiology"/);
      });

      it("filters null and undefined keys from query object cleanly", () => {
        const html = renderLink({
          href: {
            pathname: "/filter",
            query: { valid: "yes", empty: null, missing: undefined, num: 42 },
          },
        });
        assert.match(html, /href="\/filter\?valid=yes&amp;num=42"/);
        assert.doesNotMatch(html, /empty/);
        assert.doesNotMatch(html, /missing/);
      });

      it("formats UrlObject with hash (with and without leading '#')", () => {
        const html1 = renderLink({
          href: { pathname: "/about", hash: "management" },
        });
        assert.match(html1, /href="\/about#management"/);

        const html2 = renderLink({
          href: { pathname: "/about", hash: "#management" },
        });
        assert.match(html2, /href="\/about#management"/);
        // Assert no double hash like ##management
        assert.doesNotMatch(html2, /##/);
      });

      it("formats UrlObject with pathname, query, and hash together in correct order", () => {
        const html = renderLink({
          href: {
            pathname: "/services",
            query: { view: "grid" },
            hash: "emergency-ward",
          },
        });
        assert.match(html, /href="\/services\?view=grid#emergency-ward"/);
      });

      it("delegates external protocol inside UrlObject pathname", () => {
        const html = renderLink({
          href: {
            pathname: "https://maps.google.com",
            query: { q: "Healthcare Hospital Chattogram" },
          },
        });
        assert.match(html, /href="https:\/\/maps\.google\.com\?q=Healthcare\+Hospital\+Chattogram"/);
      });
    });

    describe("1.4 Falsy, Empty & Boundary Inputs", () => {
      it("falls back cleanly to root '/' on empty string or null href", () => {
        const htmlEmpty = renderLink({ href: "" });
        assert.match(htmlEmpty, /href="\/"/);

        const htmlNull = renderLink({ href: null });
        assert.match(htmlNull, /href="\/"/);

        const htmlUndefined = renderLink({ href: undefined });
        assert.match(htmlUndefined, /href="\/"/);

        const htmlEmptyObj = renderLink({ href: {} });
        assert.match(htmlEmptyObj, /href="\/"/);
      });

      it("handles hash-only UrlObject ({ hash: 'top' })", () => {
        const html = renderLink({ href: { hash: "top" } });
        assert.match(html, /href="\/?#top"/);
      });
    });

    describe("1.5 DOM Prop Forwarding & Next.js Prop Sanitization", () => {
      it("forwards standard HTML anchor attributes correctly", () => {
        const html = renderLink({
          href: "/contact",
          id: "contact-link",
          className: "text-teal-600 hover:underline",
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Contact us page link",
          "data-testid": "nav-contact",
        });

        assert.match(html, /id="contact-link"/);
        assert.match(html, /class="text-teal-600 hover:underline"/);
        assert.match(html, /target="_blank"/);
        assert.match(html, /rel="noopener noreferrer"/);
        assert.match(html, /aria-label="Contact us page link"/);
        assert.match(html, /data-testid="nav-contact"/);
      });

      it("does not leak Next.js specific props to DOM elements", () => {
        const html = renderLink({
          href: "/about",
          prefetch: false,
          scroll: false,
          shallow: true,
          passHref: true,
          locale: false,
          legacyBehavior: false,
          as: "/about-page",
        });

        assert.doesNotMatch(html, /prefetch=/i);
        assert.doesNotMatch(html, /scroll=/i);
        assert.doesNotMatch(html, /shallow=/i);
        assert.doesNotMatch(html, /passhref=/i);
        assert.doesNotMatch(html, /legacybehavior=/i);
      });
    });
  });

  // =========================================================================
  // 2. next/navigation SHIM ADVERSARIAL STRESS
  // =========================================================================
  describe("2. next/navigation Adapter Hooks Stress Matrix", () => {
    let capturedState = {};

    function NavigationHarnessComponent() {
      capturedState.pathname = nextNavigation.usePathname();
      capturedState.router = nextNavigation.useRouter();
      const searchParams = nextNavigation.useSearchParams();
      capturedState.searchParams = searchParams;
      capturedState.params = nextNavigation.useParams();
      capturedState.segment = nextNavigation.useSelectedLayoutSegment();
      capturedState.segments = nextNavigation.useSelectedLayoutSegments();
      return React.createElement("div", { id: "test-harness" }, "Navigation Test Harness");
    }

    const runHarness = (initialEntry, routePattern = "/*") => {
      capturedState = {};
      renderToString(
        React.createElement(
          MemoryRouter,
          { initialEntries: [initialEntry] },
          React.createElement(
            Routes,
            null,
            React.createElement(Route, {
              path: routePattern,
              element: React.createElement(NavigationHarnessComponent),
            })
          )
        )
      );
    };

    describe("2.1 usePathname() Precision", () => {
      it("accurately returns root pathname '/'", () => {
        runHarness("/");
        assert.equal(capturedState.pathname, "/");
      });

      it("accurately returns nested route pathname", () => {
        runHarness("/services/cardiovascular-opd");
        assert.equal(capturedState.pathname, "/services/cardiovascular-opd");
      });

      it("strips query strings and hash fragments from returned pathname", () => {
        runHarness("/appointment?patient=new#step2");
        assert.equal(capturedState.pathname, "/appointment");
      });
    });

    describe("2.2 useSearchParams() Stress", () => {
      it("returns an instance of standard URLSearchParams", () => {
        runHarness("/contact?topic=chamber&ref=google");
        assert.ok(capturedState.searchParams instanceof URLSearchParams);
        assert.equal(capturedState.searchParams.get("topic"), "chamber");
        assert.equal(capturedState.searchParams.get("ref"), "google");
      });

      it("returns empty URLSearchParams when no query parameters are present", () => {
        runHarness("/doctor");
        assert.ok(capturedState.searchParams instanceof URLSearchParams);
        assert.equal(Array.from(capturedState.searchParams.keys()).length, 0);
      });

      it("handles URL-encoded values and multiple values with getAll()", () => {
        runHarness("/services?category=opd&tag=heart&tag=medicine&search=Dr.+Amin");
        assert.equal(capturedState.searchParams.get("category"), "opd");
        assert.equal(capturedState.searchParams.get("search"), "Dr. Amin");
        assert.deepEqual(capturedState.searchParams.getAll("tag"), ["heart", "medicine"]);
      });
    });

    describe("2.3 useParams() Dynamic Route Extraction", () => {
      it("extracts named URL parameters from Route definition", () => {
        runHarness("/doctor/dr-rashedul-hasan", "/doctor/:doctorId");
        assert.deepEqual(capturedState.params, { doctorId: "dr-rashedul-hasan" });
      });

      it("returns empty object when no route parameters are defined", () => {
        runHarness("/about", "/about");
        assert.deepEqual(capturedState.params, {});
      });
    });

    describe("2.4 useRouter() AppRouterInstance Interface Conformance", () => {
      it("exposes all canonical Next.js AppRouterInstance methods", () => {
        runHarness("/");
        const router = capturedState.router;
        assert.ok(router, "Router instance must be provided");
        assert.equal(typeof router.push, "function");
        assert.equal(typeof router.replace, "function");
        assert.equal(typeof router.back, "function");
        assert.equal(typeof router.forward, "function");
        assert.equal(typeof router.refresh, "function");
        assert.equal(typeof router.prefetch, "function");
      });

      it("safely invokes prefetch as a no-op without error", () => {
        runHarness("/");
        assert.doesNotThrow(() => {
          capturedState.router.prefetch("/appointment");
        });
      });
    });

    describe("2.5 Exception Throwers & Stubs", () => {
      it("redirect() throws error with NEXT_REDIRECT prefix and target URL", () => {
        assert.throws(
          () => nextNavigation.redirect("/appointment"),
          (err) => {
            assert.ok(err instanceof Error);
            assert.match(err.message, /^NEXT_REDIRECT: \/appointment$/);
            return true;
          }
        );
      });

      it("notFound() throws error with NEXT_NOT_FOUND", () => {
        assert.throws(
          () => nextNavigation.notFound(),
          (err) => {
            assert.ok(err instanceof Error);
            assert.equal(err.message, "NEXT_NOT_FOUND");
            return true;
          }
        );
      });

      it("stubs useServerInsertedHTML, useSelectedLayoutSegment, and useSelectedLayoutSegments cleanly", () => {
        runHarness("/");
        assert.equal(capturedState.segment, null);
        assert.deepEqual(capturedState.segments, []);
        assert.doesNotThrow(() => {
          nextNavigation.useServerInsertedHTML(() => null);
        });
      });
    });
  });
});
