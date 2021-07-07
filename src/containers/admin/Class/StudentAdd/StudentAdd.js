import { useEffect, useState } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import TableAdd from "./TableAdd"

function ClassStudentAdd() {
  const [students, setStudents] = useState(null)
  const [sessions, setSessions] = useState(null)
  const [classes, setClasses] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [sessionInput, setSessionInput] = useState("")
  const authRequest = useAuthRequest()

  // data
  const getSession = () => authRequest.get("/api/admin/sessions")
  const getClassesWithSessions = (sessionId) =>
    authRequest.get(`/api/admin/classes?sessionId=${sessionId}`)
  const getStudents = (sessionId) =>
    authRequest.get(`/api/students?sessionId=${sessionId}`)

  useEffect(() => {
    document.title = "Thêm Sinh Viên Vào Lớp"
  }, [])
  useEffect(() => {
    Promise.all([getSession()]).then(([sessionArr]) => {
      setSessions(sessionArr.data)
      if (sessionArr.data) {
        if (sessionArr.data.length > 0) {
          setSessionInput(`${sessionArr.data[0].id}`)
        }
      }
    })
  }, [])
  useEffect(async () => {
    if (sessionInput.length > 0) {
      const classesData = await getClassesWithSessions(sessionInput)
      setClasses(classesData.data)
    }
  }, [sessionInput, sessions])

  // onChange
  const sessionInputChange = (e) => {
    setSessionInput(e.target.value)
  }

  // onSubmit
  const handleFind = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const studentsData = await getStudents(sessionInput)
      setStudents(studentsData.data)
      setIsLoading(false)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      setIsLoading(false)
    }
  }

  const sessionOption = (sessionData) =>
    sessionData.map((session) => (
      <option key={session.id} value={session.id}>
        {session.name}
      </option>
    ))

  return (
    <div>
      <h1>Thêm Sinh Viên Vào Lớp</h1>
      <form name="addStudent" onSubmit={handleFind}>
        <div className="form-group">
          Khoá
          <select
            className="form-control"
            id="sessionInput"
            onChange={sessionInputChange}
            value={sessionInput}
          >
            {sessions && sessionOption(sessions)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Tìm
        </button>
      </form>
      <hr />
      {students && classes && <TableAdd data={students} classes={classes} />}
    </div>
  )
}

export default ClassStudentAdd
