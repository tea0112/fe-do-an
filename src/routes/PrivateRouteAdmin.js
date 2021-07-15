import { Redirect, Route } from "react-router-dom"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import AdminSidebar from "../components/admin/AdminSidebar/AdminSidebar"
import Navbar from "../components/admin/AdminNavbar/AdminNavbar"
import LogoutModal from "../components/LogoutModal/LogoutModal"
import deepFreeze from "../helpers/deepFreeze"
import customScriptSbadmin from "../helpers/static/pages/sbadmin2/js/sb-admin-2"

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )
  useEffect(() => {
    customScriptSbadmin()
  })

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          authentication.isAuthenticated &&
          authentication.account.user.admin
        ) {
          return (
            <>
              <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                      <Component {...props} />
                    </div>
                  </div>
                </div>
              </div>
              <LogoutModal />
            </>
          )
        }
        return <Redirect to="/login" />
      }}
    />
  )
}

export default PrivateRouteAdmin
