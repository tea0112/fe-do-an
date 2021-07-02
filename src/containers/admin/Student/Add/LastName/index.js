import { memo, useEffect } from "react"
import _ from "lodash"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError"
import removeAscent from "../../../../../helpers/removeAscent"

function LastName(props) {
  const [lastName, setLastName] = useStateWithLabel("", "lastName")
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")
  useEffect(() => {
    props.onLastNameChildChange({
      value: lastName,
      isValid,
      errorMessage,
    })
  }, [lastName])

  const validateInput = (text) => {
    const regex = new RegExp("^[a-zA-Z\\s]*$")
    if (regex.test(removeAscent(text)) && text.length > 0) {
      setIsValid(true)
      setErrorMessage("")
    } else {
      setIsValid(false)
      setErrorMessage("Tên sinh viên chỉ cho phép là chữ, không để trống")
    }
  }

  const onLastNameChange = (e) => {
    setLastName(e.target.value.toLowerCase())
    validateInput(e.target.value.toLowerCase())
  }

  return (
    <div className="form-group">
      Tên Sinh Viên
      <input
        value={lastName}
        onChange={onLastNameChange}
        type="text"
        className="form-control"
        id="lastNameInput"
        autoComplete="off"
      />
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

function propsAreEqual(prev, next) {
  return _.isEqual(prev.lastName, next.lastName)
}

export default memo(LastName, propsAreEqual)
