import { useState } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function LectureHallAdd() {
  // state
  const [state, setState] = useState({
    lectureHallNameInput: "",
    lectureHallAddressInput: "",
    isLoading: false,
  })
  const authRequest = useAuthRequest()

  // effect

  // request
  const createLectureHallRequest = async () => {
    try {
      const url = "/api/admin/lectureHalls"
      const body = {
        name: state.lectureHallNameInput,
        address: state.lectureHallAddressInput,
      }
      await authRequest.post(url, body)
      alert("Thêm Thành Công")
      window.location.reload()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      alert("Thêm Thất Bại")
      window.location.reload()
    }
  }

  // on
  const onSubmit = (e) => {
    e.preventDefault()
    if (
      state.lectureHallNameInput.length !== 0 &&
      state.lectureHallAddressInput.length !== 0
    ) {
      setState((prev) => ({ ...prev, isLoading: true }))
      createLectureHallRequest()
        .then(() => {
          setState((prev) => ({ ...prev, isLoading: false }))
        })
        .catch((err) => {
          setState((prev) => ({ ...prev, isLoading: false }))
          // eslint-disable-next-line no-console
          console.log(err)
        })
    } else {
      alert("Không để trống các trường")
    }
  }

  // handle
  const handleLectureHallAddressInputChange = (e) => {
    setState({ ...state, lectureHallAddressInput: e.target.value })
  }
  const handleLectureHallNameInputChange = (e) => {
    setState({ ...state, lectureHallNameInput: e.target.value })
  }

  // component

  return (
    <>
      <h1>Thêm Giảng Đường</h1>
      <form onSubmit={onSubmit}>
        <div>
          <div>Tên Giảng Đường</div>
          <input
            type="text"
            className="form-control"
            value={state.lectureHallNameInput}
            onChange={handleLectureHallNameInputChange}
          />
        </div>
        <div>
          <div>Địa Chỉ</div>
          <input
            type="text"
            className="form-control"
            value={state.lectureHallAddressInput}
            onChange={handleLectureHallAddressInputChange}
          />
        </div>
        <button
          className="btn btn-primary mt-2"
          type="submit"
          disabled={state.isLoading}
        >
          Thêm
        </button>
      </form>
    </>
  )
}

export default LectureHallAdd
