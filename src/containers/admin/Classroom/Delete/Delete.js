import { useEffect, useState } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function ClassroomDelete() {
  // state
  const [state, setState] = useState({
    lectureHalls: null,
    classrooms: null,
    selectedLectureHall: null,
    selectedClassroom: null,
    lectureHallChangeInput: null,
    classroomChangeInput: null,
  })
  const authRequest = useAuthRequest()

  const getAllLecturerHalls = () => authRequest.get(`/api/lecturerHalls`)
  const getClassroomWithLectureHallId = (lectureHallId) =>
    authRequest.get(`/api/admin/classrooms?lectureHallId=${lectureHallId}`)

  // effect
  useEffect(async () => {
    const lectureHalls = await getAllLecturerHalls()
    setState((prevState) => ({ ...prevState, lectureHalls: lectureHalls.data }))
  }, [])
  useEffect(async () => {
    if (state.lectureHalls) {
      setState((prevState) => ({
        ...prevState,
        selectedLectureHall: state.lectureHalls[0].id,
      }))
    }
  }, [state.lectureHalls])
  useEffect(async () => {
    if (state.classrooms) {
      if (state.classrooms.length > 0) {
        setState((prevState) => ({
          ...prevState,
          selectedClassroom: state.classrooms[0].id,
        }))
      }
    }
  }, [state.classrooms])
  useEffect(async () => {
    if (state.selectedLectureHall) {
      const classrooms = await getClassroomWithLectureHallId(
        state.selectedLectureHall
      )
      setState({
        ...state,
        classrooms: classrooms.data,
        lectureHallChangeInput: state.selectedLectureHall,
      })
    }
  }, [state.selectedLectureHall])
  useEffect(async () => {
    if (state.selectedClassroom) {
      setState({
        ...state,
        classroomChangeInput: state.classrooms.find(
          (c) => c.id === parseInt(state.selectedClassroom, 10)
        ).name,
      })
    }
  }, [state.selectedClassroom])

  // request
  const updateLectureHallRequest = async () => {
    try {
      const url = `/api/admin/classrooms/${state.selectedClassroom}`
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
    updateLectureHallRequest()
  }

  // handle
  const handleSelectLectureHall = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedLectureHall: e.target.value,
    }))
  }

  const handleSelectClassroom = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedClassroom: e.target.value,
    }))
  }
  const handleLectureHallChangeInput = (e) => {
    setState((prevState) => ({
      ...prevState,
      lectureHallChangeInput: e.target.value,
    }))
  }
  const handleClassroomChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      classroomChangeInput: e.target.value,
    }))
  }

  // component
  const lectureHallOptionList = (lectureHalls) =>
    lectureHalls.map((lectureHall) => (
      <option value={lectureHall.id} key={lectureHall.id}>
        {lectureHall.name} - {lectureHall.address}
      </option>
    ))
  const classroomOptionList = (lectureHalls) =>
    lectureHalls.map((lectureHall) => (
      <option value={lectureHall.id} key={lectureHall.id}>
        {lectureHall.name}
      </option>
    ))

  return (
    <div>
      <h1>Xoá Phòng Học</h1>
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
        <div className="form-group">
          <div>Chọn Phòng Học</div>
          <select
            className="form-control"
            value={state.selectedClassroom || ""}
            onChange={handleSelectClassroom}
          >
            {state.classrooms && classroomOptionList(state.classrooms)}
          </select>
        </div>

        <hr />

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div>Giảng Đường</div>
            <select
              className="form-control"
              disabled
              value={state.lectureHallChangeInput || ""}
              onChange={handleLectureHallChangeInput}
            >
              {state.lectureHalls && lectureHallOptionList(state.lectureHalls)}
            </select>
          </div>
          <div>
            <div>Tên Phòng</div>
            <input
              type="text"
              className="form-control"
              value={state.classroomChangeInput || ""}
              disabled
              onChange={handleClassroomChange}
            />
          </div>
          <button className="btn btn-primary mt-2" type="submit">
            Xoá
          </button>
        </form>
      </div>
    </div>
  )
}

export default ClassroomDelete
