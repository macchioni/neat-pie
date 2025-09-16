module.exports = class {
  data() {
    return {
      permalink: "/feed.xml",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const { settings, collections } = data;
    const posts = collections.post || [];
    
    const rssDate = (date) => new Date(date).toUTCString();
    const escape = (str) => str.replace(/&/g, '&amp;')
                               .replace(/</g, '&lt;')
                               .replace(/>/g, '&gt;')
                               .replace(/"/g, '&quot;')
                               .replace(/'/g, '&#39;');

    return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(settings.name)}</title>
    <description>${escape(settings.name)} - Blog</description>
    <link>${settings.url}</link>
    <atom:link href="${settings.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${posts[0] ? rssDate(posts[0].date) : rssDate(new Date())}</lastBuildDate>
    ${posts.map(post => `
    <item>
      <title>${escape(post.data.title)}</title>
      <description>${escape(post.data.description || post.data.title)}</description>
      <link>${settings.url}${post.url}</link>
      <guid>${settings.url}${post.url}</guid>
      <pubDate>${rssDate(post.date)}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;
  }
};