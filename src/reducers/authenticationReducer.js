import deepFreeze from "../helpers/deepFreeze"
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions/authenticationAction"

const initialState = deepFreeze({
  isLoaded: true,
  isLoading: false,
  isAuthenticated: false,
})

const requestLoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...initialState,
        isLoading: false,
        isLoaded: true,
      }
    case LOGIN_SUCCESS:
      window.localStorage.setItem("accessToken", payload.user.accessToken)
      return {
        ...initialState,
        isLoading: false,
        isLoaded: true,
        isAuthenticated: true,
        account: payload.user,
      }
    case LOGIN_FAILURE:
      return {
        ...initialState,
        isLoading: false,
        isLoaded: true,
        isAuthenticated: false,
        errorMessage: payload.errorMessage,
      }
    case LOGOUT_SUCCESS:
      window.localStorage.clear()
      return {
        ...initialState,
        isLoading: false,
        isLoaded: true,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

export default requestLoginReducer
