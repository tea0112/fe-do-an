import { Route } from "react-router-dom"
import LoginRoute from "./login"

const Home = () => (
  <>
    <h1>Home</h1>
  </>
)

function AppRoute() {
  return (
    <>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <LoginRoute />
      </Route>
    </>
  )
}

export default AppRoute
