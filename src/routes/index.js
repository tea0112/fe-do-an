import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import React, { useMemo } from "react"
import DebugRouter from "./DebugRouter"
import HomePublic from "./public/Home"
import AdminRoute from "./admin"
import StudentRoute from "./student"
import deepFreeze from "../helpers/deepFreeze"
import Login from "../containers/Login"
import NotFound from "../components/404"

function AppRoute() {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  const checkAuth = useMemo(() => {
    if (!authentication.isLoading && authentication.isLoaded) {
      if (!authentication.isAuthenticated) {
        return <Redirect to="/login" />
      }
    }
    return null
  }, [])

  return (
    <DebugRouter>
      {checkAuth}

      <Route
        exact
        path="/"
        render={(props) => (
          <HomePublic authentication={authentication} {...props} />
        )}
      />

      <Route path="/admin" component={AdminRoute} />

      <Route path="/sinh-vien" component={StudentRoute} />

      <Route path="/login" component={Login} />

      <Route path="*">
        <NotFound />
      </Route>
    </DebugRouter>
  )
}

export default AppRoute
