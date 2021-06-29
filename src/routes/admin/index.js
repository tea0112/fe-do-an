import React from "react"
import { useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"
import HomeAdmin from "../../containers/admin/Home"
import PrivateRouteAdmin from "../PrivateRouteAdmin"
import deepFreeze from "../../helpers/deepFreeze"
import AddStudent from "../../containers/admin/Student/Add"
import NotFound from "../../components/404"

function AdminRoute() {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  return (
    <Switch>
      <PrivateRouteAdmin
        exact
        path="/admin"
        component={HomeAdmin}
        authentication={authentication}
      />
      <PrivateRouteAdmin
        exact
        path="/admin/sinh-vien/them"
        component={AddStudent}
        authentication={authentication}
      />
      <Route component={NotFound} />
    </Switch>
  )
}

export default AdminRoute
