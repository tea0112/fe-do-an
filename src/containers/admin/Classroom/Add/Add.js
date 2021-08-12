import { useState, useEffect } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function ClassroomAdd() {
  // state
  const [state, setState] = useState({
    lectureHalls: null,
    selectedLectureHall: null,
    classRoomNameInput: "",
  })
  const authRequest = useAuthRequest()

  const getAllLecturerHalls = () => authRequest.get(`/api/lecturerHalls`)

  // effect
  useEffect(async () => {
    const lectureHalls = await getAllLecturerHalls()
    setState((prevState) => ({
      ...prevState,
      lectureHalls: lectureHalls.data,
    }))
  }, [])
  useEffect(async () => {
    if (state.lectureHalls) {
      if (state.lectureHalls.length > 0) {
        setState((prevState) => ({
          ...prevState,
          selectedLectureHall: state.lectureHalls[0].id,
        }))
      }
    }
  }, [state.lectureHalls])

  // request
  const addClassroomRequest = async () => {
    try {
      const url = `/api/admin/classrooms`
      const body = {
        name: state.classRoomNameInput,
        lectureHallId: state.selectedLectureHall,
      }
      await authRequest({
        url,
        data: body,
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
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
    addClassroomRequest().then(() => {
      setState((prevState) => ({
        ...prevState,
        classRoomNameInput: e.target.value,
      }))
    })
  }

  // handle
  const handleClassroomNameInputChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      classRoomNameInput: e.target.value,
    }))
  }
  const handleSelectLectureHall = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedLectureHall: e.target.value,
    }))
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
      <h1>Thêm Phòng Học</h1>
      <form onSubmit={onSubmit}>
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
        <div>
          <div>Tên Phòng Học</div>
          <input
            type="text"
            className="form-control"
            value={state.classRoomNameInput}
            onChange={handleClassroomNameInputChange}
          />
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Thêm
        </button>
      </form>
    </div>
  )
}

export default ClassroomAdd
