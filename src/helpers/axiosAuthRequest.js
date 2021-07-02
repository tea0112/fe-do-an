import axios from "axios"
import { Redirect } from "react-router-dom"
import isExpired from "./isTokenExpired"

export default function axiosAuthRequest(dispatch) {
  const instance = axios.create()
  instance.interceptors.request.use(
    async (config) => {
      const isTokenExpired = await isExpired()
      if (isTokenExpired) {
        dispatch({ type: "LOGOUT_SUCCESS" })
        return <Redirect path="/login" />
      }
      config.headers.Authorization = localStorage.getItem("accessToken")
      return config
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  )
  return instance
}
