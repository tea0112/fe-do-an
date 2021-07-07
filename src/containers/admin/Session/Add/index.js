import { useEffect } from "react"
import useStateWithLabel from "../../../../helpers/useStateWithLabel"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import removeAscent from "../../../../helpers/removeAscent"
import FormError from "../../../../components/FormError"

function SessionComponent() {
  const authRequest = useAuthRequest()

  const [sessionNameInput, setSessionNameInput] = useStateWithLabel(
    "",
    "sessionNameInput"
  )
  const [isValid, setIsValid] = useStateWithLabel(false, "isValid")
  const [errorMessage, setErrorMessage] = useStateWithLabel("", "errorMessage")
  const [isLoading, setIsLoading] = useStateWithLabel(true, "isLoading")

  useEffect(() => {
    if (isValid) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [isValid])

  const validateInput = (text) => {
    const regex = new RegExp("^[a-zA-Z0-9]+$")
    if (regex.test(removeAscent(text)) && text.length > 0) {
      setIsValid(true)
      setErrorMessage("")
    } else {
      setIsValid(false)
      setErrorMessage("Chỉ cho phép là chữ hoặc số, viết liền.")
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authRequest.post(
        `/api/admin/sessions`,
        {
          name: sessionNameInput,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      alert(`Thêm Niên Khoá "${response.data.name}" Thành Công`)
      setSessionNameInput("")
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      alert(`Thêm Niên Khoá "${sessionNameInput}" Thất Bại. ${errorMessage}`)
      setSessionNameInput("")
    }
  }

  return (
    <div>
      <h1>Thêm Niên Khoá</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          Tên Niên Khoá
          <input
            className="form-control"
            type="text"
            value={sessionNameInput}
            onChange={(e) => {
              setSessionNameInput(e.target.value)
              validateInput(e.target.value)
            }}
          />
        </div>
        <FormError errorMessage={errorMessage} />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Thêm
        </button>
      </form>
    </div>
  )
}

export default SessionComponent
