import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm } from "../utils/typography"
import LocalizedLink from "../components/LocalizedLink"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next, slug, locale } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        lang={locale}
        og={{
          language: pageContext.ogLanguage,
        }}
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        slug={slug}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.title}
          </h1>
        </header>
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <LocalizedLink to={previous.childMdx.fields.slug} rel="prev">
                ← {previous.childMdx.frontmatter.title}
              </LocalizedLink>
            )}
          </li>
          <li>
            {next && (
              <LocalizedLink to={next.childMdx.fields.slug} rel="next">
                {next.childMdx.frontmatter.title} →
              </LocalizedLink>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const query = graphql`
  query Post($locale: String!, $slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug }, locale: { eq: $locale } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        description
      }
    }
  }
`
