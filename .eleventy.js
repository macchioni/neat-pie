const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Disable automatic use of .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  // RSS Date filter (RFC-2822, valido per RSS)
  eleventyConfig.addFilter("rssDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toRFC2822();
  });

  // Ultima data build (per <lastBuildDate>)
  eleventyConfig.addFilter("rssLastBuildDate", (posts) => {
    if (!posts || !posts.length) return DateTime.now().toRFC2822();
    let latestPostDate = posts[posts.length - 1].date;
    return DateTime.fromJSDate(latestPostDate, { zone: "utc" }).toRFC2822();
  });

  // Syntax Highlighting per blocchi di codice
  eleventyConfig.addPlugin(syntaxHighlight);

  // Supporto .yaml in _data
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copia file statici
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism-tomorrow.css",
  });

  eleventyConfig.addPassthroughCopy("./src/static/css");
  eleventyConfig.addPassthroughCopy("./src/static/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/feed.xsl");

  // 🔹 Transform per rimuovere spazi iniziali nel feed XML
  eleventyConfig.addTransform("stripXmlWhitespace", (content, outputPath) => {
    if (outputPath && outputPath.endsWith("feed.xml")) {
      return content.trimStart();
    }
    return content;
  });

  // Config di input/output
  return {
    dir: {
      input: "src",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
  };
};