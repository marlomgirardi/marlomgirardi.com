import React from "react"
import { graphql } from "gatsby"

import LocalizedLink from "../components/LocalizedLink"
import Bio from "../components/bio"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm } from "../utils/typography"

// TODO: parse keywords

const Index = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle} lang={pageContext.locale}>
      <SEO
        lang={pageContext.locale}
        og={{
          language: pageContext.ogLanguage,
        }}
        title="All posts"
      />
      <Bio />
      {posts.map(({ node: post }) => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <article key={post.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <LocalizedLink
                  style={{ boxShadow: `none` }}
                  to={post.fields.slug}
                >
                  {title}
                </LocalizedLink>
              </h3>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default Index

export const query = graphql`
  query Index($locale: String!, $dateFormat: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fields: { locale: { eq: $locale } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            locale
          }
          frontmatter {
            date(formatString: $dateFormat)
            title
            description
          }
        }
      }
    }
  }
`
