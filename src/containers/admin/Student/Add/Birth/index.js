import { memo, useEffect } from "react"
import _ from "lodash"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError"

function Birth(props) {
  const [birth, setBirth] = useStateWithLabel("", "birth")
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")
  useEffect(() => {
    props.onBirthChildChange({
      value: birth,
      isValid,
      errorMessage,
    })
  }, [birth])

  const onBirthChange = (e) => {
    setBirth(e.target.value)
    setIsValid(true)
    setErrorMessage("")
  }

  return (
    <div className="form-group">
      Ngày Sinh
      <input
        value={birth}
        onChange={onBirthChange}
        type="date"
        className="form-control"
        id="birthInput"
      />
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

function birthPropsAreEqual(prevProps, nextProps) {
  return _.isEqual(prevProps.onBirthChildChange, nextProps.onBirthChildChange)
}
export default memo(Birth, birthPropsAreEqual)
