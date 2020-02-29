import React from "react"
import LocalizedLink from "./LocalizedLink"

const isHash = str => /^#/.test(str)
const isInternal = to => /^\/(?!\/)/.test(to)

const MdxLink = ({ href, ...props }) =>
  isHash(href) || !isInternal(href)
    // It is being done by the children property passed by the parent component.
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    ? <a {...props} href={href} />
    : <LocalizedLink {...props} to={href} />

export default MdxLink