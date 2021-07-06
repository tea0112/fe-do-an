import { useEffect } from "react"
import useStateWithLabel from "../../../../helpers/useStateWithLabel"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function ClassAdd() {
  // -state
  const authRequest = useAuthRequest()

  const [sessions, setSessions] = useStateWithLabel(null, "sessions")
  const [departments, setDepartments] = useStateWithLabel(null, "departments")
  const [disabledDepartmentOption] = useStateWithLabel(
    false,
    "disabledDepartmentOption"
  )
  const [departmentInput, setDepartmentInput] = useStateWithLabel(
    "",
    "departmentInput"
  )
  const [sessionInput, setSessionInput] = useStateWithLabel("", "sessionInput")
  const [classNameInput, setClassNameInput] = useStateWithLabel(
    "",
    "classNameInput"
  )

  // -fetch
  const getSessions = () => authRequest.get("/api/admin/sessions")
  const getDepartment = () => authRequest.get("/api/departments")

  // -effect
  useEffect(() => {
    document.title = "Thêm Lớp"
  }, [])
  useEffect(() => {
    getSessions()
      .then((fetchedSessions) => {
        setSessions(fetchedSessions.data)
        if (fetchedSessions.data) {
          if (fetchedSessions.data.length > 0) {
            setSessionInput(fetchedSessions.data[0].id)
          }
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    getDepartment()
      .then((fetchedDepartments) => {
        setDepartments(fetchedDepartments.data)
        if (fetchedDepartments.data) {
          if (fetchedDepartments.data.length > 0) {
            setDepartmentInput(fetchedDepartments.data[0].id)
          }
        }
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
  const departmentOption = (departmentData) =>
    departmentData.map((department) => {
      if (department.isGeneral) {
        return (
          <option
            key={department.id}
            disabled={disabledDepartmentOption}
            value={department.id}
          >
            {department.name}
          </option>
        )
      }
      return (
        <option key={department.id} value={department.id}>
          {department.name}
        </option>
      )
    })
  // -submit
  const onSubmit = (e) => {
    e.preventDefault()
    authRequest({
      method: "POST",
      url: `/api/admin/classes`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: classNameInput,
        departmentId: departmentInput,
        sessionId: sessionInput,
      },
    })
      .then(() => {
        alert("Thêm Thành Công")
        window.location.reload()
      })
      .catch((err) => {
        alert(`Thêm Thất Bại`)
        // eslint-disable-next-line no-console
        console.log(err)
        window.location.reload()
      })
  }

  // -change
  const onDepartmentInputChange = (e) => {
    setDepartmentInput(e.target.value)
  }
  const onClassNameInputChange = (e) => {
    setClassNameInput(e.target.value)
  }
  const onSessionInputChange = (e) => {
    setSessionInput(e.target.value)
  }

  return (
    <div>
      <h1>Thêm Lớp</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          Tên Lớp
          <input
            type="text"
            id="classNameInput"
            value={classNameInput}
            onChange={onClassNameInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          Khoá
          <select
            className="form-control"
            id="sessionInput"
            value={sessionInput}
            onChange={onSessionInputChange}
          >
            {sessions && sessionOption(sessions)}
          </select>
        </div>
        <div className="form-group">
          Khoa
          <select
            className="form-control"
            id="departmentInput"
            onChange={onDepartmentInputChange}
            value={departmentInput}
          >
            {departments && departmentOption(departments)}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!classNameInput.trim()}
        >
          Thêm
        </button>
      </form>
    </div>
  )
}

export default ClassAdd
