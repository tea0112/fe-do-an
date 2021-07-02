import { useDispatch } from "react-redux"
import axiosAuthRequest from "./axiosAuthRequest"

export default function useRequest() {
  const dispatch = useDispatch()
  return [axiosAuthRequest(dispatch)]
}
