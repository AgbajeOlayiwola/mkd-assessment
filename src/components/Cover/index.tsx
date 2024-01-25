import React, { ReactNode } from "react"
import "./styles.css"
const Cover = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"outer"}>
      <div className={"inner"}>{children}</div>
    </div>
  )
}

export default Cover
