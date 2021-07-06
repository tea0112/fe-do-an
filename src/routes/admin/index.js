import React from "react"
import { Route, Switch } from "react-router-dom"
import HomeAdmin from "../../containers/admin/Home"
import PrivateRouteAdmin from "../PrivateRouteAdmin"
import AddStudent from "../../containers/admin/Student/Add"
import AddClass from "../../containers/admin/Class/Add"
import EditClass from "../../containers/admin/Class/Edit"
import DeleteClass from "../../containers/admin/Class/Delete"
import AddStudentClass from "../../containers/admin/Class/StudentAdd"
import RemoveStudentClass from "../../containers/admin/Class/StudentRemove"
import NotFound from "../../components/404"
import EditStudent from "../../containers/admin/Student/Edit"
import DeleteStudent from "../../containers/admin/Student/Delete"

function AdminRoute() {
  return (
    <Switch>
      <PrivateRouteAdmin exact path="/admin" component={HomeAdmin} />
      {/* student */}
      <PrivateRouteAdmin path="/admin/sinh-vien/them" component={AddStudent} />
      <PrivateRouteAdmin path="/admin/sinh-vien/sua" component={EditStudent} />
      <PrivateRouteAdmin
        path="/admin/sinh-vien/xoa"
        component={DeleteStudent}
      />
      {/* class */}
      <PrivateRouteAdmin path="/admin/lop/them" component={AddClass} />
      <PrivateRouteAdmin path="/admin/lop/sua" component={EditClass} />
      <PrivateRouteAdmin path="/admin/lop/xoa" component={DeleteClass} />
      <PrivateRouteAdmin
        path="/admin/lop/them-sinh-vien"
        component={AddStudentClass}
      />
      <PrivateRouteAdmin
        path="/admin/lop/xoa-sinh-vien"
        component={RemoveStudentClass}
      />
      <Route component={NotFound} />
    </Switch>
  )
}

export default AdminRoute
