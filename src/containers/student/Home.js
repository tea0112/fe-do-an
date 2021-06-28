import Button from "@material-ui/core/Button"
import React from "react"
import { useDispatch } from "react-redux"
import { logoutSuccessAction } from "../../actions/authenticationAction"

function Home() {
  const dispatch = useDispatch()
  return (
    <>
      <h1>Client</h1>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => dispatch(logoutSuccessAction())}
      >
        Logout ( tạm thời )
      </Button>
    </>
  )
}

export default Home
