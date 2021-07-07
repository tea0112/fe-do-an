import { useEffect } from "react"
import useStateWithLabel from "../../../../helpers/useStateWithLabel"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import Editable from "./EditTable"

function ClassEdit() {
  // state
  const [isLoading, setIsLoading] = useStateWithLabel(true, "isLoading")
  const [sessions, setSessions] = useStateWithLabel(null, "sessions")
  const [departments, setDepartments] = useStateWithLabel(null, "departments")
  const [classes, setClasses] = useStateWithLabel(null, "classes")
  const [clazz] = useStateWithLabel(null, "clazz")
  const [sessionInput, setSessionInput] = useStateWithLabel("", "sessionInput")
  const [departmentInput, setDepartmentInput] = useStateWithLabel(
    "",
    "departmentInput"
  )
  const authRequest = useAuthRequest()

  const getSessionPromise = () => authRequest.get("/api/admin/sessions")
  const getDepartmentPromise = () => authRequest.get("/api/departments")
  const getClasses = (sessionId, departmentId) =>
    authRequest.get(
      `/api/classes?session=${sessionId}&department=${departmentId}`
    )

  useEffect(() => {
    document.title = "Sửa Lớp"
  }, [])
  useEffect(() => {
    Promise.all([getSessionPromise(), getDepartmentPromise()]).then(
      ([sessionArr, departmentArr]) => {
        setSessions(sessionArr.data)
        setDepartments(departmentArr.data)
        if (sessionArr.data) {
          if (sessionArr.data.length > 0) {
            setSessionInput(sessionArr.data[0].id)
          }
        }
        if (departmentArr.data) {
          if (departmentArr.data.length > 0) {
            setDepartmentInput(departmentArr.data[0].id)
          }
        }
      }
    )
  }, [])
  useEffect(() => {
    if (departments) {
      if (departments.length > 0) {
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    }
  }, [departments])
  useEffect(() => {
    if (sessions) {
      if (sessions.length > 0) {
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    }
  }, [sessions])

  // onChange
  const onSessionInputChange = (e) => {
    setSessionInput(e.target.value)
  }
  const onDepartmentInputChange = (e) => {
    setDepartmentInput(e.target.value)
  }

  // onSubmit
  const onFind = (e) => {
    e.preventDefault()
    getClasses(sessionInput, departmentInput)
      .then((classesData) => {
        setClasses(classesData.data)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  // component
  const sessionOption = (sessionData) =>
    sessionData.map((session) => (
      <option key={session.id} value={session.id}>
        {session.name}
      </option>
    ))
  const departmentOption = (departmentData) =>
    departmentData.map((department) => (
      <option key={department.id} value={department.id}>
        {department.name}
      </option>
    ))
  return (
    <div>
      <h1>Sửa Lớp</h1>
      <form onSubmit={onFind}>
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
          Thuộc Khoa
          <select
            className="form-control"
            id="departmentInput"
            value={departmentInput}
            onChange={onDepartmentInputChange}
          >
            {departments && departmentOption(departments)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Tìm
        </button>
      </form>
      <br />
      <div style={{ maxWidth: "100%" }}>
        {classes && (
          <Editable
            classes={classes}
            setClasses={setClasses}
            clazz={clazz}
            departments={departments}
            sessions={sessions}
          />
        )}
      </div>
    </div>
  )
}

export default ClassEdit
