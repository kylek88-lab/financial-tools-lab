/**
 * article/ 内の公開記事と固定ページから sitemap.xml を生成する
 *
 * 使い方: npm run generate-sitemap
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASE_URL = "https://financial-tools-lab.vercel.app";
const OUTPUT = path.join(ROOT, "sitemap.xml");

/** @type {Array<{ path: string, file: string }>} */
const STATIC_PAGES = [
  { path: "/", file: "index.html" },
  { path: "/privacy.html", file: "privacy.html" },
  { path: "/simulator/mortgage-invest/", file: "simulator/mortgage-invest/index.html" },
  { path: "/simulator/education/", file: "simulator/education/index.html" },
  { path: "/simulator/asset/", file: "simulator/asset/index.html" },
  { path: "/simulator/retirement/", file: "simulator/retirement/index.html" }
];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatLastmod(date) {
  return date.toISOString().slice(0, 10);
}

function extractOgUrl(html) {
  var match =
    html.match(
      /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i
    ) ||
    html.match(
      /<meta\s+content=["']([^"']+)["']\s+property=["']og:url["']/i
    );
  return match ? match[1].trim() : null;
}

function toLoc(pagePath) {
  if (pagePath === "/") {
    return BASE_URL + "/";
  }
  return BASE_URL + pagePath;
}

function collectStaticUrls() {
  return STATIC_PAGES.map(function (page) {
    var filePath = path.join(ROOT, page.file);
    if (!fs.existsSync(filePath)) {
      throw new Error("Static page not found: " + page.file);
    }

    return {
      loc: toLoc(page.path),
      lastmod: fs.statSync(filePath).mtime
    };
  });
}

function collectArticleUrls() {
  var articleDir = path.join(ROOT, "article");
  if (!fs.existsSync(articleDir)) {
    return [];
  }

  return fs
    .readdirSync(articleDir, { withFileTypes: true })
    .filter(function (entry) {
      return entry.isDirectory();
    })
    .map(function (entry) {
      var indexPath = path.join(articleDir, entry.name, "index.html");
      if (!fs.existsSync(indexPath)) {
        return null;
      }

      var html = fs.readFileSync(indexPath, "utf8");
      var ogUrl = extractOgUrl(html);
      var loc = ogUrl || toLoc("/article/" + entry.name + "/");

      return {
        loc: loc,
        lastmod: fs.statSync(indexPath).mtime
      };
    })
    .filter(Boolean)
    .sort(function (a, b) {
      return a.loc.localeCompare(b.loc, "ja");
    });
}

function buildUrlEntry(url) {
  var lines = [
    "  <url>",
    "    <loc>" + escapeXml(url.loc) + "</loc>",
    "    <lastmod>" + formatLastmod(url.lastmod) + "</lastmod>",
    "  </url>"
  ];
  return lines.join("\n");
}

function generateSitemap() {
  var urls = collectStaticUrls().concat(collectArticleUrls());
  var body = urls.map(buildUrlEntry).join("\n");
  var xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    body +
    "\n</urlset>\n";

  fs.writeFileSync(OUTPUT, xml, "utf8");

  console.log("Generated " + path.relative(ROOT, OUTPUT));
  console.log("URLs: " + urls.length);
  urls.forEach(function (url) {
    console.log("  - " + url.loc);
  });
}

generateSitemap();
