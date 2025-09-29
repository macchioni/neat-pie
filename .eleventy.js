const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Disabilita l'uso automatico del .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data invece di sovrascrivere
  eleventyConfig.setDataDeepMerge(true);

  // Filtri date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("rssDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toRFC2822();
  });

  eleventyConfig.addFilter("rssLastBuildDate", (posts) => {
    if (!posts || !posts.length) return DateTime.now().toRFC2822();
    let latestPostDate = posts[posts.length - 1].date;
    return DateTime.fromJSDate(latestPostDate, { zone: "utc" }).toRFC2822();
  });

  // Syntax Highlight
  eleventyConfig.addPlugin(syntaxHighlight);

  // Supporto YAML in _data
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copia file statici
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism-tomorrow.css",
  });
  
  eleventyConfig.addPassthroughCopy("./src/static");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Transform per rimuovere spazi iniziali nel feed
  eleventyConfig.addTransform("stripXmlWhitespace", (content, outputPath) => {
    if (outputPath && outputPath.endsWith("feed.xml")) {
      return content.trimStart();
    }
    return content;
  });

  // Collection automatica per tutti i file in src/posts/
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getAllSorted().filter(item => 
      item.inputPath.startsWith("./src/posts/")
    );
  });

  // Config input/output
  return {
    dir: {
      input: "src",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
  };
};