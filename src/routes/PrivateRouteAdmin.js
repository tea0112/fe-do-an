import { Redirect, Route } from "react-router-dom"
import React from "react"
import { useSelector } from "react-redux"
import Sidebar from "../components/Sidebar"
import "../helpers/static/pages/sbadmin2/css/sb-admin-2.min.css"
import "../helpers/static/pages/sbadmin2/vendor/fontawesome-free/css/all.min.css"
import Navbar from "../containers/Navbar"
import LogoutModal from "../components/LogoutModal"
import deepFreeze from "../helpers/deepFreeze"

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

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
