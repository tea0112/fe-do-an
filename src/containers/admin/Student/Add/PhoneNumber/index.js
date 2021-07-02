import { memo, useEffect } from "react"
import _ from "lodash"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError"

function PhoneNumber(props) {
  const [phoneNumber, setPhoneNumber] = useStateWithLabel("", "phoneNumber")
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")

  useEffect(() => {
    props.onPhoneNumberChildChange({
      value: phoneNumber.trim(),
      isValid,
      errorMessage,
    })
  }, [phoneNumber])

  const validateInput = (text) => {
    const regex = new RegExp("((01|02|03|04|05|06|07|08|09)+([0-9]{8})\\b)")
    if (regex.test(text) && text.length === 10) {
      setIsValid(true)
      setErrorMessage("")
    } else {
      setIsValid(false)
      setErrorMessage("Số điện thoại chứa 10 ký tự là số, bắt đầu từ 0")
    }
  }

  const onPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value.toLowerCase())
    validateInput(e.target.value.toLowerCase())
  }

  return (
    <div className="form-group">
      Số Điện Thoại
      <input
        value={phoneNumber}
        onChange={onPhoneNumberChange}
        type="text"
        className="form-control"
        id="phoneNumberInput"
        autoComplete="off"
      />
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

export default memo(PhoneNumber, (prev, next) =>
  _.isEqual(prev.phoneNumber, next.phoneNumber)
)
