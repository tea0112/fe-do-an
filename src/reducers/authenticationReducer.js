import deepFreeze from "../helpers/deepFreeze"
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions/authenticationAction"

const initialState = deepFreeze({
  loading: true,
  isAuthenticated: false,
})

const requestLoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      window.localStorage.setItem("accessToken", payload.user.accessToken)
      return {
        ...initialState,
        loading: false,
        isAuthenticated: true,
        account: payload.user,
      }
    case LOGIN_FAILURE:
      return {
        ...initialState,
        loading: false,
        isAuthenticated: false,
        errorMessage: payload.errorMessage,
      }
    case LOGOUT_SUCCESS:
      window.localStorage.clear()
      return {
        ...initialState,
        loading: true,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

export default requestLoginReducer
