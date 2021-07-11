import { Route, Switch, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from "react"
import HomePublic from "./public/Home"
import AdminRoute from "./admin/admin"
import StudentRoute from "./student/student"
import deepFreeze from "../helpers/deepFreeze"
import Login from "../containers/Login/Login"
import NotFound from "../components/404"
import isTokenExpired from "../helpers/isTokenExpired"

function AppRoute() {
  const location = useLocation()
  const dispatch = useDispatch()

  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  useEffect(async () => {
    if (authentication.isAuthenticated) {
      const isExpired = await isTokenExpired()
      if (isExpired) {
        dispatch({ type: "LOGOUT_SUCCESS" })
      }
    }
  }, [location.pathname])

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <HomePublic authentication={authentication} {...props} />
          )}
        />

        <Route path="/admin" component={AdminRoute} />

        <Route path="/sinh-vien" component={StudentRoute} />

        <Route exact path="/login" component={Login} />

        <Route path="*" component={NotFound} />
      </Switch>
    </>
  )
}

export default AppRoute
