import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"
import React, { useMemo } from "react"
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
    <BrowserRouter>
      <Switch>
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

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRoute
