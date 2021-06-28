import { Redirect, Route } from "react-router-dom"
import React from "react"

const PrivateRouteAdmin = ({
  component: Component,
  authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (authentication.isAuthenticated && authentication.account.user.admin) {
        return <Component {...props} />
      }
      return <Redirect to="/login" />
    }}
  />
)

export default PrivateRouteAdmin
