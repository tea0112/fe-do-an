import { useEffect } from "react"
import axios from "axios"
import useStateWithLabel from "../../../../../helpers/useStateWithLabel"
import FormError from "../../../../../components/FormError/FormError"
import BasicClassOptions from "../../../../../components/admin/form/BasicOption/BasicOption"

function AddBasicClass(props) {
  const [basicClass, setBasicClass] = useStateWithLabel("", "basicClass")
  const [options, setOptions] = useStateWithLabel(null, "basicClass options")
  const [isValid, setIsValid] = useStateWithLabel(true, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")

  const fetchAllBasicClasss = (sessionId) =>
    axios.get(`/api/classes?sessionId=${sessionId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })

  useEffect(async () => {
    if (props.session) {
      if (props.session.value) {
        const basicClasses = await fetchAllBasicClasss(props.session.value)
        setOptions(basicClasses.data)
        if (basicClasses.data.length > 0) {
          setBasicClass(basicClasses.data[0].id.toString())
        } else {
          setBasicClass("")
        }
      }
    }
  }, [props.session])

  useEffect(() => {
    props.onBasicClassChildChange({
      value: basicClass,
      isValid,
      errorMessage,
    })
  }, [basicClass])

  const onBasicClassChange = (e) => {
    setBasicClass(e.target.value)
    setIsValid(true)
    setErrorMessage("")
  }

  return (
    <div className="form-group">
      Lớp Cơ Bản
      <select
        value={basicClass}
        onChange={onBasicClassChange}
        className="form-control"
        id="classSelectInput"
      >
        {options && (
          <BasicClassOptions
            options={options}
            valueProperty="id"
            content="name"
          />
        )}
      </select>
      <FormError isValid={isValid} errorMessage={errorMessage} />
    </div>
  )
}

export default AddBasicClass
