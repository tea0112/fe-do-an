import { useRef, useEffect, useState } from "react"
import $ from "jquery"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import deepFreeze from "../../../../helpers/deepFreeze"

function SemesterDelete() {
  // state
  const [sessions, setSessions] = useState(null)
  const [semesters, setSemesters] = useState(null)
  const [semester, setSemester] = useState(null)
  // ref
  const sessionsRef = useRef(null)
  const semestersRef = useRef(null)
  const termNumberChangeInputRef = useRef(null)
  const startDayChangeInputRef = useRef(null)
  const endDayChangeInputRef = useRef(null)
  const sessionChangeRef = useRef(null)
  const authRequest = useAuthRequest()

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
  const preDeleteClick = () => {
    $("#deleteModal").modal()
  }
  const onDelete = (e) => {
    e.preventDefault()
    authRequest({
      method: "DELETE",
      url: `/api/admin/semesters/${semester.id}`,
    })
      .then(() => {
        alert("Xoá Thành Công")
        window.location.reload()
      })
      .catch((err) => {
        alert(`Xoá Thất Bại ${err}`)
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
      <h1>Xoá Học Kỳ</h1>
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
      <hr />
      {semester && (
        <div key={semester.id}>
          <form onSubmit={onDelete}>
            <div className="form-group">
              Id
              <input
                className="form-control"
                defaultValue={semester.id}
                ref={startDayChangeInputRef}
                disabled
                type="text"
                id="startDayChangeInput"
              />
            </div>
            <div className="form-group">
              Học Kỳ Số
              <select
                className="form-control"
                id="termNumberChangeInput"
                defaultValue={semester && semester.termNumber}
                disabled
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
                disabled
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
                disabled
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
                disabled
              >
                {sessions && sessionOption(sessions)}
              </select>
            </div>
            <button
              type="button"
              onClick={preDeleteClick}
              className="btn btn-primary"
            >
              Xoá
            </button>
            {/* start modal */}
            <div
              className="modal fade"
              id="deleteModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Bạn chắc chắn muốn xoá Học Kỳ{" "}
                      {semester && <b>{semester.termNumber}</b>}:
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {semester && (
                      <span>
                        id: {semester.id} - học kỳ {semester.termNumber} - ngày
                        bắt đầu {semester.startDay}
                        &nbsp;- ngày kết thúc {semester.endDay}{" "}
                      </span>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Đóng
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Xoá
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* end modal */}
          </form>
        </div>
      )}
    </div>
  )
}

export default SemesterDelete
