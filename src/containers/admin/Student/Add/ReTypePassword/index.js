import { useEffect } from "react"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError"

function ReTypePassword({ onReTypePasswordChildChange, password }) {
  const [reTypePassword, setReTypePassword] = useStateWithLabel(
    "",
    "reTypePassword"
  )
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")

  useEffect(() => {
    onReTypePasswordChildChange({
      value: reTypePassword,
      isValid,
      errorMessage,
    })
  }, [reTypePassword])

  const validateInput = (text) => {
    if (text === password.value) {
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

export default ReTypePassword
