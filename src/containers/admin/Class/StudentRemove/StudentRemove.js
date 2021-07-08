import { memo, useEffect, useState } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import TableRemove from "./TableRemove"

function SessionComponent({ setParentSessionInput, sessions }) {
  const [sessionInput, setSessionInput] = useState("")
  const sessionOption = (sessionData) =>
    sessionData.map((session) => (
      <option key={session.id} value={session.id}>
        {session.name}
      </option>
    ))
  const handleSessionChange = (e) => {
    setSessionInput(e.target.value)
    setParentSessionInput(e.target.value)
  }
  return (
    <>
      <div className="form-group">
        Niên Khoá
        <select
          className="form-control"
          id="sessionInput"
          onChange={handleSessionChange}
          value={sessionInput}
        >
          {sessions && sessionOption(sessions)}
        </select>
      </div>
    </>
  )
}

// eslint-disable-next-line no-unused-vars
function StudentRemove() {
  useEffect(() => {
    document.title = "Xoá Sinh Viên Khỏi Lớp"
  }, [])

  const axiosAuthRequest = useAuthRequest()
  const [isFetching, setIsFetching] = useState(false)
  const [students, setStudents] = useState(null)
  const [sessions, setSessions] = useState(null)
  const [departments, setDepartments] = useState(null)
  const [classes, setClasses] = useState(null)
  const [sessionInput, setSessionInput] = useState("")
  const [departmentInput, setDepartmentInput] = useState("")
  const [classInput, setClassInput] = useState("")
  const [currentClass, setCurrentClass] = useState("")

  const getSessionPromise = () => axiosAuthRequest.get("/api/admin/sessions")
  const getDepartmentPromise = () => axiosAuthRequest.get("/api/departments")
  const getClasses = (sessionId, departmentId) =>
    axiosAuthRequest.get(
      `/api/classes?sessionId=${sessionId}&departmentId=${departmentId}`
    )
  const getStudents = (classId) =>
    axiosAuthRequest.get(`/api/admin/students?classId=${classId}`)

  useEffect(() => {
    Promise.all([getSessionPromise(), getDepartmentPromise()]).then(
      ([sessionArr, departmentArr]) => {
        setSessions(sessionArr.data)
        setDepartments(departmentArr.data)

        if (sessionArr.data && departmentArr.data) {
          setSessionInput(sessionArr.data[0].id)
          setDepartmentInput(departmentArr.data[0].id)

          getClasses(sessionArr.data[0].id, departmentArr.data[0].id)
            .then((fetchedClasses) => {
              setClasses(fetchedClasses.data)
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err))
        }
      }
    )
  }, [])
  useEffect(() => {
    if (sessions && departments) {
      if (sessionInput && departmentInput) {
        if (sessionInput !== "" && departmentInput !== "") {
          getClasses(sessionInput, departmentInput)
            .then((fetchedClasses) => {
              setClasses(fetchedClasses.data)
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err))
        }
      }
    }
  }, [sessionInput, departmentInput])
  useEffect(() => {
    if (classes) {
      if (classes.length > 0) {
        setClassInput(classes[0].id)
        setCurrentClass(classes[0])
        setIsFetching(false)
      } else {
        setIsFetching(true)
      }
    }
  }, [classes])

  // onChange
  const handleDepartmentChange = (e) => {
    setDepartmentInput(e.target.value)
  }
  const handleClassChange = (e) => {
    setClassInput(e.target.value)
    setCurrentClass(classes.find((c) => c.id === parseInt(e.target.value, 10)))
  }

  // onClick
  const handleClassClick = () => {}

  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsFetching(true)
    if (classInput) {
      getStudents(classInput)
        .then((fetchedStudents) => {
          setIsFetching(false)
          setStudents(fetchedStudents.data)
        })
        .catch((err) => {
          setIsFetching(false)
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }
  // option
  const departmentOption = (departmentData) =>
    departmentData.map((department) => (
      <option key={department.id} value={department.id}>
        {department.name}
      </option>
    ))
  const classOption = (classData) =>
    classData.map((clazz) => (
      <option key={clazz.id} value={clazz.id}>
        {clazz.name}
      </option>
    ))
  return (
    <>
      <h1>Xoá Sinh Viên Khỏi Lớp</h1>
      <form name="addStudent" onSubmit={handleSubmit}>
        {sessions && (
          <SessionComponent
            setParentSessionInput={setSessionInput}
            sessions={sessions}
          />
        )}
        <div className="form-group">
          Khoa
          <select
            className="form-control"
            id="departmentInput"
            onChange={handleDepartmentChange}
            value={departmentInput}
          >
            {departments && departmentOption(departments)}
          </select>
        </div>
        <div className="form-group">
          Lớp
          <select
            className="form-control"
            id="classInput"
            value={classInput}
            onChange={handleClassChange}
            onClick={handleClassClick}
          >
            {classes && classOption(classes)}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!classes || isFetching}
        >
          Tìm
        </button>
      </form>
      <br />
      <div style={{ maxWidth: "100%" }}>
        {students && (
          <TableRemove
            students={students}
            setStudents={setStudents}
            currentClass={currentClass}
          />
        )}
      </div>
    </>
  )
}

export default memo(StudentRemove)
