import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import {
  LOGIN_REQUEST_ASYNC,
  loginFailureAction,
  loginRequestAction,
  loginSuccessAction,
} from "../actions/authenticationAction"

const login = (account) => {
  const url = `/api/auth`
  const body = {
    ...account,
  }
  return axios.post(url, body)
}

function* loginWorker({ payload }) {
  try {
    yield put(loginRequestAction())
    const response = yield call(login, payload)
    if (response.status === 200) {
      yield put(loginSuccessAction(response.data))
    } else {
      yield put(loginFailureAction(response))
    }
  } catch (error) {
    yield put(loginFailureAction(error))
  }
}

export default takeEvery(LOGIN_REQUEST_ASYNC, loginWorker)
