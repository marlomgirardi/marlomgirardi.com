import React from "react"

/**
 * Create the context and the wrapper to deal with locales.
 */
const LocaleContext = React.createContext()

const Locale = ({ children, pageContext: { locale } }) => (
  <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>
)

export { Locale, LocaleContext }
