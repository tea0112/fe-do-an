import { Redirect, Route } from "react-router-dom"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Sidebar from "../components/Sidebar"
import Navbar from "../containers/Navbar"
import LogoutModal from "../components/LogoutModal"
import deepFreeze from "../helpers/deepFreeze"
import customScriptSbAdmin from "../helpers/static/pages/sbadmin2/js/sb-admin-2"

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )
  useEffect(() => {
    customScriptSbAdmin()
  }, [])

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
