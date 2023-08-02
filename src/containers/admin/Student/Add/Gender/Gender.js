import { useEffect } from "react"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError/FormError"

function AddGender({ onGenderChildChange }) {
  const [gender, setGender] = useStateWithLabel("0", "gender")
  const [isValid] = useStateWithLabel(true, "isValid")
  const [errorMessage] = useStateWithLabel("", "errorMessage")

  useEffect(() => {
    onGenderChildChange({
      value: gender,
      isValid,
      errorMessage,
    })
  }, [gender])

  const onGenderChange = (e) => {
    setGender(e.target.value.toLowerCase())
  }

  return (
    <div className="form-group">
      Giới Tính:
      <select
        value={gender}
        onChange={onGenderChange}
        className="form-control"
        id="genderInput"
      >
        <option value="0">Nam</option>
        <option value="1">Nữ</option>
      </select>
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

export default AddGender
