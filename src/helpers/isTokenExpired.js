import axios from "axios"

function isTokenExpired() {
  return axios
    .get(`/api/auth?token=${window.localStorage.getItem("accessToken")}`)
    .then(() => false)
    .catch(() => true)
}

export default isTokenExpired
