import { useSelector } from "react-redux"
import React from "react"
import deepFreeze from "../../helpers/deepFreeze"
import HomeStudent from "../../containers/student/Home"
import PrivateRouteStudent from "../PrivateRouteStudent"

function StudentRoute() {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  return (
    <>
      <PrivateRouteStudent
        path="/sinh-vien"
        component={HomeStudent}
        authentication={authentication}
      />
    </>
  )
}

export default StudentRoute
