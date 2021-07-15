import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import StudentSidebar from "../components/student/StudentSidebar/StudentSidebar"
import StudentNavbar from "../containers/student/StudentNavbar"
import LogoutModal from "../components/LogoutModal/LogoutModal"
import deepFreeze from "../helpers/deepFreeze"
import customScriptSbadmin from "../helpers/static/pages/sbadmin2/js/sb-admin-2"

const PrivateRouteStudent = ({ component: Component, ...rest }) => {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )
  useEffect(() => {
    customScriptSbadmin()
  })

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          authentication.isAuthenticated &&
          !authentication.account.user.admin
        ) {
          return (
            <>
              <div id="wrapper">
                <StudentSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    <StudentNavbar />
                    <div className="container-fluid">
                      <Component {...props} />
                    </div>
                  </div>
                </div>
              </div>
              <LogoutModal />
            </>
          )
        }
        return <Redirect to="/login" />
      }}
    />
  )
}

export default PrivateRouteStudent
