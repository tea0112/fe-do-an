import { memo, useEffect } from "react"
import _ from "lodash"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError/FormError"

function AddPlace(props) {
  const [place, setPlace] = useStateWithLabel("", "place")
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")

  useEffect(() => {
    props.onPlaceChildChange({
      value: place,
      isValid,
      errorMessage,
    })
  }, [place])

  const onPlaceChange = (e) => {
    setPlace(e.target.value.toLowerCase())
    setIsValid(true)
    setErrorMessage("")
  }

  return (
    <div className="form-group">
      Địa Chỉ
      <input
        value={place}
        onChange={onPlaceChange}
        type="text"
        className="form-control"
        id="placeInput"
        autoComplete="off"
      />
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

export default memo(AddPlace, (prv, nxt) => _.isEqual(prv.place, nxt.place))
