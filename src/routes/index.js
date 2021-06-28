import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import React, { useMemo } from "react"
import DebugRouter from "./DebugRouter"
import HomeAdmin from "../containers/admin/Home"
import HomeStudent from "../containers/student/Home"
import HomePublic from "./public/Home"
// import HomeClient from "../containers/student/Home"
import PrivateRouteAdmin from "./PrivateRouteAdmin"
import deepFreeze from "../helpers/deepFreeze"
import Login from "../containers/Login"
import PrivateRouteStudent from "./PrivateRouteStudent"

function AppRoute() {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  // const [setFirstAuth, setSetFirstAuth] = useState(false)

  const checkAuth = useMemo(() => {
    if (!authentication.isLoading && authentication.isLoaded) {
      if (!authentication.isAuthenticated) {
        return <Redirect to="/login" />
      }
    }
    return null
  }, [])

  return (
    <DebugRouter>
      {checkAuth}

      <Route
        exact
        path="/"
        render={(props) => (
          <HomePublic authentication={authentication} {...props} />
        )}
      />

      <PrivateRouteStudent
        path="/sinh-vien"
        component={HomeStudent}
        authentication={authentication}
      />

      <PrivateRouteAdmin
        path="/admin"
        component={HomeAdmin}
        authentication={authentication}
      />

      <Route path="/login" component={Login} />
    </DebugRouter>
  )
}

export default AppRoute
