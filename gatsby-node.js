/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const locales = require(`./config/i18n`)
const {
  localizedSlug,
  findKey,
  removeTrailingSlash,
} = require(`./src/utils/nodeHelpers`)

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)

  Object.keys(locales).map(lang => {
    const localizedPath = locales[lang].default
      ? page.path
      : `${locales[lang].path}${page.path}`

    return createPage({
      ...page,
      path: removeTrailingSlash(localizedPath),
      context: {
        ...page.context,
        locale: lang,
        dateFormat: locales[lang].dateFormat,
        ogLanguage: locales[lang].ogLanguage,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const name = path.basename(node.fileAbsolutePath).replace(/\.mdx?$/, "");
    const defaultKey = findKey(locales, (locale) => locale.default === true)
    const lang = name.split(`.`)[1]
    const isDefault = lang === defaultKey
    const slug = name.replace(RegExp(`.${lang}$`), "");

    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })
    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        blog: allFile(
          filter: {
            sourceInstanceName: { eq: "blog" }
            ext: { in: [".md", ".mdx"] }
          }
          sort: { fields: [childMdx___frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              childMdx {
                fields {
                  slug
                  locale
                  isDefault
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.blog.edges

  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    const title = post.childMdx.frontmatter.title
    const slug = post.childMdx.fields.slug
    const locale = post.childMdx.fields.locale
    const isDefault = post.childMdx.fields.isDefault

    createPage({
      path: localizedSlug({ isDefault, locale, slug }),
      component: postTemplate,
      context: {
        slug,
        previous,
        next,
        locale,
        title,
      },
    })
  })
}

