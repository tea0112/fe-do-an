import React, { useMemo } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import backgroundImage from "../../helpers/static/imgs/tru_so_chinh.jpg"
import {
  loginRequestAsyncAction,
  logoutSuccessAction,
} from "../../actions/authenticationAction"
import deepFreeze from "../../helpers/deepFreeze"
import useStateWithLabel from "../../helpers/useStateWithLabel"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login() {
  const authentication = useSelector((state) =>
    deepFreeze(state.authentication)
  )

  const classes = useStyles()

  const dispatch = useDispatch()

  const [firstUpdate, setFirstUpdate] = useStateWithLabel(false, "firstUpdate")
  const [username, setUsername] = useStateWithLabel("", "username")
  const [password, setPassword] = useStateWithLabel("", "password")

  const usernameTxFieldChange = (e) => {
    setUsername(e.target.value)
  }
  const pwdTxFieldChange = (e) => {
    setPassword(e.target.value)
  }

  const loginSubmit = (e) => {
    e.preventDefault()
    if (!firstUpdate) {
      setFirstUpdate(true)
    }
    dispatch(
      loginRequestAsyncAction({
        username,
        password,
      })
    )
  }

  const checkAuth = useMemo(() => {
    if (!authentication.isLoading && authentication.isLoaded) {
      if (authentication.isAuthenticated) {
        return <Redirect to="/" />
      }
    }
    return null
  }, [authentication.isAuthenticated])

  const hasAuthError = useMemo(() => {
    if (authentication.isLoaded && !authentication.isLoading) {
      if (authentication.errorMessage) {
        return (
          <center>
            <b style={{ color: "red" }}>Sai Tài Khoản Hoặc Mật Khẩu</b>
          </center>
        )
      }
    }
    return null
  }, [authentication.errorMessage])

  const usernameFieldMemo = useMemo(
    () => (
      <TextField
        value={username}
        onChange={usernameTxFieldChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="account"
        label="Tài Khoản"
        name="account"
        autoComplete="username"
        autoFocus
      />
    ),
    [username]
  )

  const passwordFieldMemo = useMemo(
    () => (
      <TextField
        value={password}
        onChange={pwdTxFieldChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Mật Khẩu"
        type="password"
        id="password"
        autoComplete="current-password"
      />
    ),
    [password]
  )

  return (
    <>
      {checkAuth}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng Nhập Để Tiếp Tục
            </Typography>
            <form className={classes.form} noValidate>
              {firstUpdate ? hasAuthError : null}
              {usernameFieldMemo}
              {passwordFieldMemo}
              {/* <FormControlLabel */}
              {/*  control={<Checkbox value="remember" color="primary" />} */}
              {/*  label="Duy trì đăng nhập" */}
              {/* /> */}
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={loginSubmit}
              >
                Đăng Nhập
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => dispatch(logoutSuccessAction())}
              >
                Logout ( tạm thời )
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
