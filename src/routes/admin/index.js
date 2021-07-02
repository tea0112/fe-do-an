import React, { useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import HomeAdmin from "../../containers/admin/Home"
import PrivateRouteAdmin from "../PrivateRouteAdmin"
import AddStudent from "../../containers/admin/Student/Add"
import NotFound from "../../components/404"
import customScriptSbAdmin from "../../helpers/static/pages/sbadmin2/js/sb-admin-2"

function AdminRoute() {
  useEffect(() => {
    customScriptSbAdmin()
  }, [])
  return (
    <Switch>
      <PrivateRouteAdmin exact path="/admin" component={HomeAdmin} />
      <PrivateRouteAdmin path="/admin/sinh-vien/them" component={AddStudent} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default AdminRoute
