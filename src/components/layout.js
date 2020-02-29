import React from "react"
import { MDXProvider } from "@mdx-js/react"
import LocalizedLink from "./LocalizedLink"
import MdxLink from "./MdxLink"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children, lang }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const rootWithLang = rootPath + lang
  let header

  if ([rootPath, rootWithLang].includes(location.pathname)) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <LocalizedLink
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </LocalizedLink>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <LocalizedLink
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </LocalizedLink>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>
        <MDXProvider components={{ a: MdxLink }}>
          {children}
        </MDXProvider>
      </main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout