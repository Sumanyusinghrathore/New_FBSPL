const fs = require("fs");
const https = require("https");

const apiUrl = "https://admin.fbspl.com/sitemap";

https
  .get(apiUrl, (resp) => {
    let data = "";

    // A chunk of data has been received.
    resp.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      const sitemap = JSON.parse(data);
      if (sitemap.urls) {
        let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemapXml +=
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        sitemap.urls.forEach((entry) => {
          sitemapXml += "  <url>\n";
          sitemapXml += `    <loc>${entry.url}</loc>\n`;
          sitemapXml += `    <lastmod>${entry.date}</lastmod>\n`;
          sitemapXml += `    <priority>${entry.priority}</priority>\n`;
          sitemapXml += "  </url>\n";
        });

        sitemapXml += "</urlset>\n";
        fs.writeFileSync("src/sitemap.xml", sitemapXml);
        console.log("sitemap.xml generated");
      }
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
