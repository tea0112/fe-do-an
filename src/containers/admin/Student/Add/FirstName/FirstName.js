import { memo, useEffect } from "react"
import _ from "lodash"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError/FormError"
import removeAscent from "../../../../../helpers/removeAscent"

function AddFirstName(props) {
  const [firstName, setFirstName] = useStateWithLabel("", "firstName")
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")
  useEffect(() => {
    props.onFirstNameChildChange({
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
        id="firstNameInput"
        autoComplete="off"
      />
      <FormError errorMessage={errorMessage} />
    </div>
  )
}

export default memo(AddFirstName, (prev, next) =>
  _.isEqual(prev.onFirstNameChildChange, next.onFirstNameChildChange)
)
