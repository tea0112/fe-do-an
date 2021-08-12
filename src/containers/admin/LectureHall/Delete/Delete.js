import { useEffect, useState } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function LectureHallDelete() {
  // state
  const [state, setState] = useState({
    lectureHalls: null,
    selectedLectureHall: null,
    lectureHallNameInput: "",
    lectureHallAddressInput: "",
  })
  const authRequest = useAuthRequest()

  const getAllLecturerHalls = () => authRequest.get(`/api/lecturerHalls`)

  // effect
  useEffect(async () => {
    const lectureHalls = await getAllLecturerHalls()
    setState({ ...state, lectureHalls: lectureHalls.data })
  }, [])
  useEffect(async () => {
    if (state.lectureHalls) {
      if (state.lectureHalls.length > 0) {
        setState({ ...state, selectedLectureHall: state.lectureHalls[0].id })
      }
    }
  }, [state.lectureHalls])
  useEffect(() => {
    if (state.selectedLectureHall) {
      const selectedLectureHall = state.lectureHalls.find(
        (lH) => lH.id === parseInt(state.selectedLectureHall, 10)
      )
      setState({
        ...state,
        lectureHallNameInput: selectedLectureHall.name,
        lectureHallAddressInput: selectedLectureHall.address,
      })
    }
  }, [state.selectedLectureHall])

  // request
  const deleteLectureHallRequest = async () => {
    try {
      const url = `/api/admin/lectureHalls/${state.selectedLectureHall}`
      await authRequest({
        url,
        method: "DELETE",
      })
      alert("Xoá Thành Công")
      window.location.reload()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      alert("Xoá Thất Bại")
      window.location.reload()
    }
  }

  // on
  const onSubmit = (e) => {
    e.preventDefault()
    deleteLectureHallRequest()
  }

  // handle
  const handleLectureHallAddressInputChange = (e) => {
    setState({ ...state, lectureHallAddressInput: e.target.value })
  }
  const handleLectureHallNameInputChange = (e) => {
    setState({ ...state, lectureHallNameInput: e.target.value })
  }
  const handleSelectLectureHall = (e) => {
    setState({ ...state, selectedLectureHall: e.target.value })
  }

  // component
  const lectureHallOptionList = (lectureHalls) =>
    lectureHalls.map((lectureHall) => (
      <option value={lectureHall.id} key={lectureHall.id}>
        {lectureHall.name} - {lectureHall.address}
      </option>
    ))

  return (
    <div>
      <div className="form-group">
        <div>Chọn Giảng Đường</div>
        <select
          className="form-control"
          value={state.selectedLectureHall || ""}
          onChange={handleSelectLectureHall}
        >
          {state.lectureHalls && lectureHallOptionList(state.lectureHalls)}
        </select>
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <div>Tên Giảng Đường</div>
          <input
            type="text"
            className="form-control"
            value={state.lectureHallNameInput}
            onChange={handleLectureHallNameInputChange}
            disabled
          />
        </div>
        <div>
          <div>Địa Chỉ</div>
          <input
            type="text"
            className="form-control"
            value={state.lectureHallAddressInput}
            onChange={handleLectureHallAddressInputChange}
            disabled
          />
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Xoá
        </button>
      </form>
    </div>
  )
}

export default LectureHallDelete
