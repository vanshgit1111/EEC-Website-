import { useEffect } from "react";

function setMeta(attr, key, value, selectorAttr = "name") {
  if (!value) return;
  let el = document.head.querySelector(`meta[${selectorAttr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(selectorAttr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel, href, keyAttr = "rel") {
  if (!href) return;
  const selector = `link[${keyAttr}="${rel}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute(keyAttr, rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  canonical,
  robots,
  ogTitle,
  ogDescription,
  jsonLd,
}) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta("description", "description", description);
    setMeta("robots", "robots", robots, "name");
    setMeta("og:title", "og:title", ogTitle || title, "property");
    setMeta("og:description", "og:description", ogDescription || description, "property");
    if (canonical) setLink("canonical", canonical);

    const scriptIds = [];
    const payloads = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    payloads.forEach((payload, idx) => {
      const id = `jsonld-${title || "page"}-${idx}`;
      scriptIds.push(id);
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(payload);
    });

    return () => {
      scriptIds.forEach((id) => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, [title, description, canonical, robots, ogTitle, ogDescription, jsonLd]);

  return null;
}
