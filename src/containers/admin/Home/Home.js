import React, { useEffect } from "react"
import "./Home.css"

function Home() {
  useEffect(() => {
    const content = document.getElementById("content")
    // const topBar = document.getElementById("topBar")
    const topBar = document.querySelector(
      ".navbar.navbar-expand.navbar-light.bg-white.topbar.mb-4.static-top"
    )
    const panel = document.getElementById("panel")
    const iframe = document.getElementById("iframe")
    const iframeHeight =
      content.offsetHeight - topBar.offsetHeight - 24 * 2 - panel.offsetHeight
    iframe.setAttribute("height", `${iframeHeight}px`)
  })
  return (
    <>
      <h1 id="panel">Thông Tin Chung</h1>
      <div className="row-container">
        <iframe
          title="HACTECH"
          src="https://www.hactech.edu.vn/"
          className="iframe"
          id="iframe"
        />
      </div>
    </>
  )
}

export default Home
