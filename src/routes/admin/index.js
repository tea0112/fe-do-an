import React from "react"
import { Route, Switch } from "react-router-dom"
import HomeAdmin from "../../containers/admin/Home"
import PrivateRouteAdmin from "../PrivateRouteAdmin"
import AddStudent from "../../containers/admin/Student/Add"
import NotFound from "../../components/404"
import EditStudent from "../../containers/admin/Student/Edit"
import DeleteStudent from "../../containers/admin/Student/Delete"

function AdminRoute() {
  return (
    <Switch>
      <PrivateRouteAdmin exact path="/admin" component={HomeAdmin} />
      <PrivateRouteAdmin path="/admin/sinh-vien/them" component={AddStudent} />
      <PrivateRouteAdmin path="/admin/sinh-vien/sua" component={EditStudent} />
      <PrivateRouteAdmin
        path="/admin/sinh-vien/xoa"
        component={DeleteStudent}
      />
      <Route component={NotFound} />
    </Switch>
  )
}

export default AdminRoute
