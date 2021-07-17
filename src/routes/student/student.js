import { useSelector } from "react-redux"
import React from "react"
import deepFreeze from "../../helpers/deepFreeze"
import HomeStudent from "../../components/student/StudentHome/StudentHome"
import PrivateRouteStudent from "../PrivateRouteStudent"
import StudentProfile from "../../containers/student/StudentProfile"
import StudentSchedule from "../../components/student/StudentSchedule/StudentSchedule"
import StudentGrade from "../../components/student/StudentGrade/StudentGrade"

function StudentRoute() {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )
  return (
    <>
      <PrivateRouteStudent
        exact
        path="/sinh-vien"
        component={HomeStudent}
        authentication={authentication}
      />
      <PrivateRouteStudent
        path="/sinh-vien/thong-tin-ca-nhan"
        component={StudentProfile}
        authentication={authentication}
      />
      <PrivateRouteStudent
        path="/sinh-vien/thoi-khoa-bieu/hien-tai"
        component={StudentSchedule}
        authentication={authentication}
      />
      <PrivateRouteStudent
        path="/sinh-vien/diem/diem-thi"
        component={StudentGrade}
        authentication={authentication}
      />
    </>
  )
}

export default StudentRoute
