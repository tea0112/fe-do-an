export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGIN_REQUEST_ASYNC = "LOGIN_REQUEST_ASYNC"
export const LOGIN_SUCCESS_ASYNC = "LOGIN_SUCCESS_ASYNC"
export const LOGIN_FAILURE_ASYNC = "LOGIN_FAILURE_ASYNC"
export const LOGOUT_SUCCESS_ASYNC = "LOGOUT_SUCCESS_ASYNC"

export const loginRequestAction = () => ({
  type: LOGIN_REQUEST,
})

export const loginSuccessAction = (user) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
})

export const loginFailureAction = (errorMessage) => ({
  type: LOGIN_FAILURE,
  payload: { errorMessage },
})

export const logoutSuccessAction = () => ({
  type: LOGOUT_SUCCESS,
})

export const loginRequestAsyncAction = ({ username, password }) => ({
  type: LOGIN_REQUEST_ASYNC,
  payload: { username, password },
})
