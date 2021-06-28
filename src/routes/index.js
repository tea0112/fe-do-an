import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import React from "react"
import DebugRouter from "./DebugRouter"
import HomeAdmin from "../containers/admin/Home"
import HomeStudent from "../containers/student/Home"
import HomePublic from "./public/Home"
// import HomeClient from "../containers/student/Home"
import PrivateRouteAdmin from "./PrivateRouteAdmin"
import deepFreeze from "../helpers/deepFreeze"
import Login from "../containers/Login"
import PrivateRouteStudent from "./PrivateRouteStudent"

function AppRoute() {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  const checkAuth = () => {
    if (!authentication.isLoading && authentication.isLoaded) {
      if (!authentication.isAuthenticated) {
        return <Redirect to="/login" />
      }
    }
    return null
  }

  const isAuthenticated = () => {
    if (!authentication.isLoading && authentication.isLoaded) {
      if (authentication.isAuthenticated) {
        return true
      }
      return <Redirect to="/login" />
    }
    return null
  }

  return (
    <DebugRouter>
      {checkAuth()}

      {isAuthenticated() ? (
        <Route
          exact
          path="/"
          render={(props) => (
            <HomePublic authentication={authentication} {...props} />
          )}
        />
      ) : null}

      {isAuthenticated() ? (
        <PrivateRouteStudent
          path="/sinh-vien"
          component={HomeStudent}
          authentication={authentication}
        />
      ) : null}

      {isAuthenticated() ? (
        <PrivateRouteAdmin
          path="/admin"
          component={HomeAdmin}
          authentication={authentication}
        />
      ) : null}

      <Route path="/login" component={Login} />
    </DebugRouter>
  )
}

export default AppRoute
