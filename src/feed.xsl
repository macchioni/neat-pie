<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="utf-8" indent="yes"/>
  
  <xsl:template match="/rss">
    <html>
      <head>
        <title><xsl:value-of select="channel/title"/> - RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="/static/css/neat.css"/>
        <style>
          .feed-info {
            background-color: var(--lesslight);
            padding: 1rem;
            margin-bottom: 2rem;
            border-radius: .25em;
          }
          
          .post-item {
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
          }
          
          .post-item:last-child {
            border-bottom: none;
          }
        </style>
      </head>
      <body>
        <div class="feed-info center">
          <h1>RSS Feed</h1>
          <p>Subscribe to <strong><xsl:value-of select="channel/title"/></strong> to get new posts in your RSS reader.</p>
          <p><code><xsl:value-of select="channel/link"/>/feed.xml</code></p>
        </div>

        <xsl:for-each select="channel/item">
          <div class="post-item">
            <h3>
              <a href="{link}">
                <xsl:value-of select="title"/>
              </a>
            </h3>
            <p><xsl:value-of select="description"/></p>
            <small><xsl:value-of select="pubDate"/></small>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>