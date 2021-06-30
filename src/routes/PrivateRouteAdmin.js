import { Redirect, Route } from "react-router-dom"
import React, { useLayoutEffect } from "react"
import $ from "jquery"
import { useSelector } from "react-redux"
import Sidebar from "../components/Sidebar"
import "../helpers/static/pages/sbadmin2/css/sb-admin-2.min.css"
import "../helpers/static/pages/sbadmin2/vendor/fontawesome-free/css/all.min.css"
import customScriptSbadmin from "../helpers/static/pages/sbadmin2/js/sb-admin-2"
import Navbar from "../containers/Navbar"
import LogoutModal from "../components/LogoutModal"
import deepFreeze from "../helpers/deepFreeze"

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  useLayoutEffect(() => {
    customScriptSbadmin($)
  })

  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  const isCompletedRender = () => {
    if (!authentication.isLoading && authentication.isLoaded) {
      return true
    }
    return false
  }

  return isCompletedRender() ? (
    <Route
      {...rest}
      render={(props) => {
        if (
          authentication.isAuthenticated &&
          authentication.account.user.admin
        ) {
          const Admin = () => (
            <>
              <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                      <Component {...props} />
                    </div>
                  </div>
                </div>
              </div>
              <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
              </a>
              <LogoutModal />
            </>
          )
          return <Admin />
        }
        return <Redirect to="/login" />
      }}
    />
  ) : null
}

export default PrivateRouteAdmin
