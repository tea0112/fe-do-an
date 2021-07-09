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
import SubjectAdd from "../../containers/admin/Subject/Add/Add"
import SubjectEdit from "../../containers/admin/Subject/Edit/Edit"
import SubjectDelete from "../../containers/admin/Subject/Delete/Delete"
import LecturerAdd from "../../containers/admin/Lecturer/Add/Add"
import LecturerEdit from "../../containers/admin/Lecturer/Edit/Edit"
import LecturerDelete from "../../containers/admin/Lecturer/Delete/Delete"
import SemesterAdd from "../../containers/admin/Semester/Add/Add"
import SemesterEdit from "../../containers/admin/Semester/Edit/Edit"
import SemesterDelete from "../../containers/admin/Semester/Delete/Delete"
import DepartmentAdd from "../../containers/admin/Department/Add/Add"
import DepartmentEdit from "../../containers/admin/Department/Edit/Edit"
import DepartmentDelete from "../../containers/admin/Department/Delete/Delete"
import LectureHallAdd from "../../containers/admin/LectureHall/Add/Add"
import LectureHallEdit from "../../containers/admin/LectureHall/Edit/Edit"
import LectureHallDelete from "../../containers/admin/LectureHall/Delete/Delete"

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

      {/* Subject */}
      <PrivateRouteAdmin path="/admin/mon/them" component={SubjectAdd} />
      <PrivateRouteAdmin path="/admin/mon/sua" component={SubjectEdit} />
      <PrivateRouteAdmin path="/admin/mon/xoa" component={SubjectDelete} />

      {/* Lecturer */}
      <PrivateRouteAdmin
        path="/admin/giang-vien/them"
        component={LecturerAdd}
      />
      <PrivateRouteAdmin
        path="/admin/giang-vien/sua"
        component={LecturerEdit}
      />
      <PrivateRouteAdmin
        path="/admin/giang-vien/xoa"
        component={LecturerDelete}
      />

      {/* Semester */}
      <PrivateRouteAdmin path="/admin/hoc-ky/them" component={SemesterAdd} />
      <PrivateRouteAdmin path="/admin/hoc-ky/sua" component={SemesterEdit} />
      <PrivateRouteAdmin path="/admin/hoc-ky/xoa" component={SemesterDelete} />

      {/* Department */}
      <PrivateRouteAdmin path="/admin/khoa/them" component={DepartmentAdd} />
      <PrivateRouteAdmin path="/admin/khoa/sua" component={DepartmentEdit} />
      <PrivateRouteAdmin path="/admin/khoa/xoa" component={DepartmentDelete} />

      {/* LectureHall */}
      <PrivateRouteAdmin
        path="/admin/giang-duong/them"
        component={LectureHallAdd}
      />
      <PrivateRouteAdmin
        path="/admin/giang-duong/sua"
        component={LectureHallEdit}
      />
      <PrivateRouteAdmin
        path="/admin/giang-duong/xoa"
        component={LectureHallDelete}
      />

      {/* LectureHall */}
      <PrivateRouteAdmin
        path="/admin/giang-duong/them"
        component={LectureHallAdd}
      />
      <PrivateRouteAdmin
        path="/admin/giang-duong/sua"
        component={LectureHallEdit}
      />
      <PrivateRouteAdmin
        path="/admin/giang-duong/xoa"
        component={LectureHallDelete}
      />

      {/* Not Found Page */}
      <Route component={NotFound} />
    </Switch>
  )
}

export default AdminRoute
