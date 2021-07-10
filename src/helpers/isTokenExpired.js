import axios from "axios"

function isTokenExpired() {
  return axios
    .post(`/api/auth/checkToken`, {
      bearerToken: window.localStorage.getItem("accessToken"),
    })
    .then(() => false)
    .catch(() => true)
}

export default isTokenExpired
