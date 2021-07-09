import { useEffect, useRef, useState } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function SemesterAdd() {
  // -state
  const [sessions, setSessions] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const authRequest = useAuthRequest()

  // -fetch
  const getSession = () => authRequest.get(`/api/admin/sessions`)

  // -ref
  const sessionRef = useRef()
  const startDayRef = useRef()
  const endDayRef = useRef()
  const termNumberInputRef = useRef()

  // -effect
  useEffect(() => {
    getSession()
      .then((sessionsData) => {
        setSessions(sessionsData.data)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }, [])

  // -component
  const sessionOption = (sessionData) =>
    sessionData.map((session) => (
      <option key={session.id} value={session.id}>
        {session.name}
      </option>
    ))
  // -submit
  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    authRequest({
      method: "POST",
      url: `/api/admin/semesters`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        termNumber: termNumberInputRef.current.value,
        sessionId: sessionRef.current.value,
        startDay: startDayRef.current.value,
        endDay: endDayRef.current.value,
      },
    })
      .then(() => {
        setIsLoading(false)
        alert("Thêm Thành Công")
      })
      .catch((err) => {
        setIsLoading(false)
        // eslint-disable-next-line no-console
        console.log(err)
        alert(
          "Thêm Thất Bại.\nNgày Bắt Đầu Phải Nhỏ Hơn Ngày Kết Thúc.\nKhông Được Trùng, Trống"
        )
      })
  }
  // -change
  return (
    <div>
      <h1>Thêm Học Kỳ</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          Khoá
          <select className="form-control" id="sessionInput" ref={sessionRef}>
            {sessions && sessionOption(sessions)}
          </select>
        </div>
        <div className="form-group">
          Ngày Bắt Đầu
          <input
            className="form-control"
            ref={startDayRef}
            type="date"
            id="startDayInput"
          />
        </div>
        <div className="form-group">
          Ngày Kết Thúc
          <input
            className="form-control"
            type="date"
            ref={endDayRef}
            id="endDayInput"
          />
        </div>
        <div className="form-group">
          Học Kỳ Số
          <select
            className="form-control"
            id="termNumberInput"
            ref={termNumberInputRef}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        <button disabled={isLoading} type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </div>
  )
}

export default SemesterAdd
