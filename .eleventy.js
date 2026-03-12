const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);

  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy")
  );

  eleventyConfig.addFilter("rssDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toRFC2822()
  );

  eleventyConfig.addFilter("rssLastBuildDate", (posts) => {
    if (!posts?.length) return DateTime.now().toRFC2822();
    return DateTime.fromJSDate(posts[posts.length - 1].date, { zone: "utc" }).toRFC2822();
  });

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);

  // YAML support
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Static files
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism-tomorrow.css",
  });
  eleventyConfig.addPassthroughCopy("./src/static");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/blogroll.opml");

  // XSL template format (for feed.xsl)
  eleventyConfig.addTemplateFormats("xsl");

  // Strip leading whitespace from feed.xml and feed.xsl
  eleventyConfig.addTransform("stripXmlWhitespace", (content, outputPath) => {
    if (outputPath?.endsWith("feed.xml") || outputPath?.endsWith("feed.xsl")) {
      return content.trimStart();
    }
    return content;
  });

  // Posts collection
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getAllSorted().filter((item) =>
      item.inputPath.startsWith("./src/posts/")
    )
  );

  return {
    dir: { input: "src", output: "_site" },
    htmlTemplateEngine: "njk",
  };
};