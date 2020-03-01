/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({
  description,
  lang,
  meta,
  title,
  keywords = [],
  slug = "",
  og,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const siteUrl = site.siteMetadata.siteUrl
  const { twitter } = site.siteMetadata.social

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={[
        { rel: "canonical", href: `${siteUrl}/${slug}` },
        { rel: "amphtml", href: `${siteUrl}/amp/${slug}` },
      ]}
      meta={[
        { name: `description`, content: metaDescription },

        { property: `og:type`, content: `website` },
        { property: `og:title`, content: title },
        { property: `og:language`, content: og.language },
        { property: `og:description`, content: metaDescription },

        { name: `twitter:card`, content: `summary` },
        { name: `twitter:creator`, content: twitter },
        { name: `twitter:title`, content: title },
        { name: `twitter:description`, content: metaDescription },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  og: PropTypes.shape({
    language: PropTypes.string,
  }),
}

export default SEO
