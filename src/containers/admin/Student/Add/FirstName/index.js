import { useEffect } from "react"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError"
import removeAscent from "../../../../../helpers/removeAscent"

function FirstName({ onFirstNameChildChange }) {
  const [firstName, setFirstName] = useStateWithLabel("", "firstName")
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")

  useEffect(() => {
    onFirstNameChildChange({
      value: firstName,
      isValid,
      errorMessage,
    })
  }, [firstName])

  const validateInput = (text) => {
    const regex = new RegExp("^[a-zA-Z\\s]*$")
    if (regex.test(removeAscent(text)) && text.length > 0) {
      setIsValid(true)
      setErrorMessage("")
    } else {
      setIsValid(false)
      setErrorMessage("Họ sinh viên chỉ cho phép là chữ, không để trống")
    }
  }

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value.toLowerCase())
    validateInput(e.target.value.toLowerCase())
  }

  return (
    <div className="form-group">
      Họ Sinh Viên
      <input
        value={firstName}
        onChange={onFirstNameChange}
        type="text"
        className="form-control"
        id="usernameInput"
        autoComplete="off"
      />
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

export default FirstName
