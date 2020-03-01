import React from "react"
import { Locale } from "./Locale"

const WrapPageElement = ({ element, props }) => (
  <Locale {...props}>{element}</Locale>
)

export default WrapPageElement
