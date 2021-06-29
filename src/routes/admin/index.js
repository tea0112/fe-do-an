import React from "react"
import { useSelector } from "react-redux"
import HomeAdmin from "../../containers/admin/Home"
import PrivateRouteAdmin from "../PrivateRouteAdmin"
import deepFreeze from "../../helpers/deepFreeze"
import AddStudent from "../../containers/admin/Student/Add"

function AdminRoute() {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  return (
    <>
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
    </>
  )
}

export default AdminRoute
