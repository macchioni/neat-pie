<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">

  <xsl:output method="html" encoding="utf-8" indent="yes"/>

  <!-- Template principale -->
  <xsl:template match="/">
    <xsl:choose>
      <xsl:when test="/rss">
        <xsl:apply-templates select="/rss/channel"/>
      </xsl:when>
      <xsl:when test="/atom:feed">
        <xsl:apply-templates select="/atom:feed"/>
      </xsl:when>
      <xsl:otherwise>
        <html>
          <head><title>Unknown Feed</title></head>
          <body><p>Unsupported feed format</p></body>
        </html>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Template per RSS -->
  <xsl:template match="channel">
    <html>
      <head>
        <title><xsl:value-of select="title"/> - RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="/static/css/neat.css"/>
        <style>
          .feed-info {
            background-color: var(--lesslight);
            padding: 1rem;
            margin-bottom: 2rem;
            border-radius: .25em;
            text-align: center;
          }
          .feed-info a.button {
            display: inline-block;
            margin-top: .5rem;
            padding: .4rem .8rem;
            background: #333;
            color: #fff;
            border-radius: .25em;
            text-decoration: none;
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
          <p>Subscribe to <strong><xsl:value-of select="title"/></strong></p>
          <p><code><xsl:value-of select="link"/>/feed.xml</code></p>
          <a class="button" href="{link}">← Back to Blog</a>
        </div>

        <xsl:for-each select="item">
          <div class="post-item">
            <h3><a href="{link}"><xsl:value-of select="title"/></a></h3>
            <p><xsl:value-of select="description"/></p>
            <small><xsl:value-of select="pubDate"/></small>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>

  <!-- Template per Atom -->
  <xsl:template match="atom:feed">
    <html>
      <head>
        <title><xsl:value-of select="atom:title"/> - Atom Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="/static/css/neat.css"/>
        <style>
          .feed-info {
            background-color: var(--lesslight);
            padding: 1rem;
            margin-bottom: 2rem;
            border-radius: .25em;
            text-align: center;
          }
          .feed-info a.button {
            display: inline-block;
            margin-top: .5rem;
            padding: .4rem .8rem;
            background: #333;
            color: #fff;
            border-radius: .25em;
            text-decoration: none;
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
          <h1>Atom Feed</h1>
          <p>Subscribe to <strong><xsl:value-of select="atom:title"/></strong></p>
          <xsl:if test="atom:link[@rel='alternate']">
            <a class="button" href="{atom:link[@rel='alternate']/@href}">← Back to Blog</a>
          </xsl:if>
        </div>

        <xsl:for-each select="atom:entry">
          <div class="post-item">
            <h3>
              <a href="{atom:link/@href}">
                <xsl:value-of select="atom:title"/>
              </a>
            </h3>
            <p><xsl:value-of select="atom:summary"/></p>
            <small><xsl:value-of select="atom:updated"/></small>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
