module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog (AMP to PWA)`,
    author: {
      name: `Tomoyuki Kashiro`,
      summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `A starter blog (AMP to PWA) demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-amp-to-pwa.netlify.com/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                let url = site.siteMetadata.siteUrl

                if (!edge.node.fields.isDefault) {
                  url = url + "/" + edge.node.fields.locale
                }

                url = url + "/" + edge.node.fields.slug

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": edge.node.body }],
                })
              })
            },
            query: `
            {
              allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    body
                    fields {
                      slug
                      locale
                      isDefault
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "Gatsby RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-html2amp",
      options: {
        files: ["**/index.html", "index.html"],
        gaConfigPath: "gaConfig.json",
        dist: "public/amp",
        serviceWorker: {
          src: "https://gatsby-starter-blog-amp-to-pwa.netlify.com/sw.js",
          "data-iframe-src":
            "https://gatsby-starter-blog-amp-to-pwa.netlify.com/amp-install-serviceworker.html",
          layout: "nodisplay",
        },
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
