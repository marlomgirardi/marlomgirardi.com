import React from "react"
import { Link } from "gatsby"
import { LocaleContext } from "./Locale"
import locales from "../../config/i18n"

const LocalizedLink = ({ to, ...props }) => {
  const { locale } = React.useContext(LocaleContext)
  const isIndex = to === `/`
  const path = locales[locale].default
    ? to
    : `${locales[locale].path}/${isIndex ? `` : `${to}`}`

  // From SEO perspective if the same route ends with
  // a / and a link for the same router doesn't it will
  // be considered as a new route.
  let link = path.replace(/\/$/, "")

  if (path.indexOf("/") !== 0) {
    link = `/${link}`
  }

  return <Link {...props} to={link} />
}

export default LocalizedLink
