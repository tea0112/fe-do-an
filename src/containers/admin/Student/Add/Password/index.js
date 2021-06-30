import { useEffect } from "react"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError"

function Password({ onPasswordChildChange }) {
  const [password, setPassword] = useStateWithLabel("", "password")
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")

  useEffect(() => {
    onPasswordChildChange({
      value: password,
      isValid,
      errorMessage,
    })
  }, [password])

  const validateInput = (text) => {
    if (text.length >= 8) {
      setIsValid(true)
      setErrorMessage("")
    } else {
      setIsValid(false)
      setErrorMessage("Mật khẩu tối thiểu 8 ký tự")
    }
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
    validateInput(e.target.value)
  }

  return (
    <div className="form-group">
      Mật Khẩu
      <input
        value={password}
        onChange={onPasswordChange}
        type="password"
        className="form-control"
        id="passwordInput"
        autoComplete="off"
      />
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

export default Password
