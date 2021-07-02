import { memo, useEffect } from "react"
import _ from "lodash"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError"

function ReTypePassword(props) {
  const [reTypePassword, setReTypePassword] = useStateWithLabel(
    "",
    "reTypePassword"
  )
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")
  useEffect(() => {
    props.onReTypePasswordChildChange({
      value: reTypePassword,
      isValid,
      errorMessage,
    })
  }, [reTypePassword])

  const validateInput = (text) => {
    if (text === props.password.value) {
      setIsValid(true)
      setErrorMessage("")
    } else {
      setIsValid(false)
      setErrorMessage("Không trùng khớp với mật khẩu đã nhập")
    }
  }

  const onReTypePasswordChange = (e) => {
    setReTypePassword(e.target.value)
    validateInput(e.target.value)
  }

  return (
    <div className="form-group">
      Nhập Lại Mật Khẩu
      <input
        value={reTypePassword}
        onChange={onReTypePasswordChange}
        type="password"
        className="form-control"
        id="reTypePasswordInput"
        autoComplete="off"
      />
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

function propsAreEqual(prv, nxt) {
  return _.isEqual(prv.password, nxt.password)
}
export default memo(ReTypePassword, propsAreEqual)
