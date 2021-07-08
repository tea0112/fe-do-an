import React from "react"
import { Route, Switch } from "react-router-dom"
import HomeAdmin from "../../containers/admin/Home"
import PrivateRouteAdmin from "../PrivateRouteAdmin"
import AddStudent from "../../containers/admin/Student/Add/Add"
import AddClass from "../../containers/admin/Class/Add/Add"
import EditClass from "../../containers/admin/Class/Edit/Edit"
import DeleteClass from "../../containers/admin/Class/Delete/Delete"
import AddStudentClass from "../../containers/admin/Class/StudentAdd/StudentAdd"
import RemoveStudentClass from "../../containers/admin/Class/StudentRemove/StudentRemove"
import NotFound from "../../components/404"
import EditStudent from "../../containers/admin/Student/Edit"
import DeleteStudent from "../../containers/admin/Student/Delete"
import SessionComponent from "../../containers/admin/Session/Add/Add"
import SessionEdit from "../../containers/admin/Session/Edit/Edit"
import SessionDelete from "../../containers/admin/Session/Delete/Delete"
import ScheduleAdd from "../../containers/admin/Schedule/Add/Add"
import ScheduleEdit from "../../containers/admin/Schedule/Edit/Edit"
import ScheduleEditId from "../../containers/admin/Schedule/Edit/Id/Id"
import ScheduleDelete from "../../containers/admin/Schedule/Delete/Delete"

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

      {/* session */}
      <PrivateRouteAdmin
        path="/admin/nien-khoa/them"
        component={SessionComponent}
      />
      <PrivateRouteAdmin path="/admin/nien-khoa/sua" component={SessionEdit} />
      <PrivateRouteAdmin
        path="/admin/nien-khoa/xoa"
        component={SessionDelete}
      />

      {/* schedule */}
      <PrivateRouteAdmin
        path="/admin/thoi-khoa-bieu/them"
        component={ScheduleAdd}
      />
      <PrivateRouteAdmin
        exact
        path="/admin/thoi-khoa-bieu/sua"
        component={ScheduleEdit}
      />
      <PrivateRouteAdmin
        path="/admin/thoi-khoa-bieu/sua/:scheduleId"
        component={ScheduleEditId}
      />
      <PrivateRouteAdmin
        path="/admin/thoi-khoa-bieu/xoa"
        component={ScheduleDelete}
      />

      {/* Not Found Page */}
      <Route component={NotFound} />
    </Switch>
  )
}

export default AdminRoute
