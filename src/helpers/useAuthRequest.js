import { useDispatch } from "react-redux"
import axiosAuthRequest from "./axiosAuthRequest"

export default function useAuthRequest() {
  const dispatch = useDispatch()
  return axiosAuthRequest(dispatch)
}
