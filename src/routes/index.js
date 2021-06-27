import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import LoginRoute from "./login"

const HomeAdmin = () => (
  <>
    <h1>Admin</h1>
  </>
)
const HomeClient = () => (
  <>
    <h1>Student</h1>
  </>
)

function AppRoute() {
  const authentication = useSelector((state) => state.authentication)
  return (
    <>
      {!authentication.isAuthenticated && <Redirect to="/login" />}
      <Route path="/" exact>
        {authentication.isAuthenticated && authentication.account.user.admin ? (
          <HomeAdmin />
        ) : (
          <HomeClient />
        )}
      </Route>
      <Route path="/login">
        <LoginRoute />
      </Route>
    </>
  )
}

export default AppRoute
