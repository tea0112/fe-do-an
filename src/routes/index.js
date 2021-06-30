import { BrowserRouter, Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"
import React from "react"
import HomePublic from "./public/Home"
import AdminRoute from "./admin"
import StudentRoute from "./student"
import deepFreeze from "../helpers/deepFreeze"
import Login from "../containers/Login"
import NotFound from "../components/404"
import DebugRouter from "./DebugRouter"

function AppRoute() {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  const isCompletedRender = () =>
    !!(!authentication.isLoading && authentication.isLoaded)

  return isCompletedRender() ? (
    <DebugRouter>
      <BrowserRouter>
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
      </BrowserRouter>
    </DebugRouter>
  ) : null
}

export default AppRoute
