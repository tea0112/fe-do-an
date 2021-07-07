import { useEffect } from "react"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError/FormError"

function StudentNumber({ onStudentNumberChildChange }) {
  const [studentNumber, setStudentNumber] = useStateWithLabel(
    "",
    "studentNumber"
  )
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")

  useEffect(() => {
    onStudentNumberChildChange({
      value: studentNumber,
      isValid,
      errorMessage,
    })
  }, [studentNumber])

  const validateInput = (text) => {
    const regex = new RegExp("^[-a-zA-Z0-9-]+([-a-zA-Z0-9-]+)*$")
    if (regex.test(text) && text.length > 0) {
      setIsValid(true)
      setErrorMessage("")
    } else {
      setIsValid(false)
      setErrorMessage(
        "Mã sinh viên viết liền, chỉ cho phép là chữ hoặc số, không để trống"
      )
    }
  }

  const onStudentNumberChange = (e) => {
    setStudentNumber(e.target.value.toLowerCase())
    validateInput(e.target.value.toLowerCase())
  }

  return (
    <div className="form-group">
      Mã Số Sinh Viên
      <input
        value={studentNumber}
        onChange={onStudentNumberChange}
        type="text"
        className="form-control"
        id="usernameInput"
        autoComplete="off"
      />
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

export default StudentNumber
