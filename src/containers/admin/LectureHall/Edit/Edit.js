import { useEffect, useState } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function LectureHallEdit() {
  // state
  const [state, setState] = useState({
    lectureHalls: null,
    selectedLectureHall: null,
    lectureHallNameInput: "",
    lectureHallAddressInput: "",
    isLoading: false,
  })
  const authRequest = useAuthRequest()

  const getAllLecturerHalls = () => authRequest.get(`/api/lecturerHalls`)

  // effect
  useEffect(async () => {
    const lectureHalls = await getAllLecturerHalls()
    setState((prev) => ({ ...prev, lectureHalls: lectureHalls.data }))
  }, [])
  useEffect(async () => {
    if (state.lectureHalls) {
      setState((prev) => ({
        ...prev,
        selectedLectureHall: state.lectureHalls[0].id,
      }))
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
  const updateLectureHallRequest = async () => {
    try {
      const url = `/api/admin/lectureHalls/${state.selectedLectureHall}`
      const body = {
        name: state.lectureHallNameInput,
        address: state.lectureHallAddressInput,
      }
      await authRequest({
        url,
        data: body,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })
      alert("Cập Nhật Thành Công")
      window.location.reload()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      alert("Cập Nhật Thất Bại")
      window.location.reload()
    }
  }

  // on
  const onSubmit = (e) => {
    e.preventDefault()
    updateLectureHallRequest().then(() => {
      setState((prev) => ({ ...prev, isLoading: false }))
    })
  }

  // handle
  const handleLectureHallAddressInputChange = (e) => {
    setState((prev) => ({ ...prev, lectureHallAddressInput: e.target.value }))
  }
  const handleLectureHallNameInputChange = (e) => {
    setState((prev) => ({ ...prev, lectureHallNameInput: e.target.value }))
  }
  const handleSelectLectureHall = (e) => {
    setState((prev) => ({ ...prev, selectedLectureHall: e.target.value }))
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
        <button className="btn btn-primary mt-2" type="submit">
          Cập Nhật
        </button>
      </form>
    </div>
  )
}

export default LectureHallEdit
