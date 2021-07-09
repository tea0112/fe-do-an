import { useEffect, useState, useRef } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import deepFreeze from "../../../../helpers/deepFreeze"

function SemesterUpdate() {
  // state
  const [sessions, setSessions] = useState(null)
  const [semesters, setSemesters] = useState(null)
  const [semester, setSemester] = useState(null)
  const authRequest = useAuthRequest()

  // ref
  const sessionsRef = useRef(null)
  const semestersRef = useRef(null)
  const termNumberChangeInputRef = useRef(null)
  const startDayChangeInputRef = useRef(null)
  const endDayChangeInputRef = useRef(null)
  const sessionChangeRef = useRef(null)

  // fetch
  const getSessions = () => authRequest.get("/api/admin/sessions")
  const getSemesters = (sessionId) =>
    authRequest.get(`/api/semesters?sessionId=${sessionId}`)

  // effect
  useEffect(() => {
    getSessions()
      .then((sessionsData) => {
        setSessions(deepFreeze(sessionsData.data))
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    if (sessions)
      getSemesters(sessionsRef.current.value)
        .then((semestersData) => {
          setSemesters(deepFreeze(semestersData.data))
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
  }, [sessions])
  useEffect(() => {
    if (semesters) {
      semesters.filter(
        (semesterElm) =>
          parseInt(semestersRef.current.value, 10) === semesterElm.id &&
          setSemester(deepFreeze(semesterElm))
      )
    }
  }, [semesters])

  // change
  const sessionsInputChange = () => {
    getSemesters(sessionsRef.current.value)
      .then((semestersData) => {
        setSemesters(deepFreeze(semestersData.data))
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }
  const semestersInputChange = () => {
    if (semesters) {
      semesters.filter(
        (semesterElm) =>
          parseInt(semestersRef.current.value, 10) === semesterElm.id &&
          setSemester(deepFreeze(semesterElm))
      )
    }
  }

  // submit
  const onUpdate = (e) => {
    e.preventDefault()
    authRequest({
      method: "PATCH",
      url: `/api/admin/semesters/${semester.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        termNumber: termNumberChangeInputRef.current.value,
        sessionId: sessionChangeRef.current.value,
        startDay: startDayChangeInputRef.current.value,
        endDay: endDayChangeInputRef.current.value,
      },
    })
      .then(() => {
        alert("Cập Nhật Thành Công")
        window.location.reload()
      })
      .catch((err) => {
        alert(`Cập Nhật Thất Bại ${err}`)
        window.location.reload()
      })
  }

  // component
  const sessionOption = (sessionData) =>
    sessionData.map((session) => (
      <option key={session.id} value={session.id}>
        {session.name}
      </option>
    ))
  const semesterOption = (semesterData) =>
    semesterData.map((semesterElm) => (
      <option key={semesterElm.id} value={semesterElm.id}>
        {semesterElm.termNumber}
      </option>
    ))
  return (
    <div>
      <h1>Sửa Học Kỳ</h1>
      <form>
        <div className="form-group">
          Khoá
          <select
            className="form-control"
            id="sessionsInput"
            ref={sessionsRef}
            onChange={sessionsInputChange}
          >
            {sessions && sessionOption(sessions)}
          </select>
        </div>
        <div className="form-group">
          Học Kỳ
          <select
            className="form-control"
            id="semestersInput"
            ref={semestersRef}
            onChange={semestersInputChange}
          >
            {semesters && semesterOption(semesters)}
          </select>
        </div>
      </form>
      <hr />
      <h3>
        Nhập Thay Đổi Cho:&nbsp;
        <u>
          {semester && (
            <span>
              Học Kỳ Số {semester.termNumber} - Khoá&nbsp;
              {semester.session.name}
            </span>
          )}
        </u>
      </h3>
      <hr />
      {semester && (
        <div key={semester.id}>
          <form onSubmit={onUpdate}>
            <div className="form-group">
              Học Kỳ Số
              <select
                className="form-control"
                id="termNumberChangeInput"
                defaultValue={semester && semester.termNumber}
                ref={termNumberChangeInputRef}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="form-group">
              Ngày Bắt Đầu
              <input
                className="form-control"
                defaultValue={semester.startDay}
                ref={startDayChangeInputRef}
                type="date"
                id="startDayChangeInput"
              />
            </div>
            <div className="form-group">
              Ngày Kết Thúc
              <input
                className="form-control"
                type="date"
                defaultValue={semester.endDay}
                ref={endDayChangeInputRef}
                id="endDayChangeInput"
              />
            </div>
            <div className="form-group">
              Khoá
              <select
                className="form-control"
                id="sessionsChangeInput"
                ref={sessionChangeRef}
                defaultValue={semester.session.id}
              >
                {sessions && sessionOption(sessions)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Cập Nhật
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default SemesterUpdate
