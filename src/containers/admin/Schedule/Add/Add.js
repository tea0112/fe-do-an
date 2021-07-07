import { useEffect } from "react"
import useStateWithLabel from "../../../../helpers/useStateWithLabel"
import BasicOption from "../../../../components/BasicOption/BasicOption"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function ScheduleAdd() {
  const [departments, setDepartments] = useStateWithLabel(null, "departments")
  const [subjects, setSubjects] = useStateWithLabel(null, "subjects")
  const [lecturers, setLecturers] = useStateWithLabel(null, "lecturers")
  const [sessions, setSessions] = useStateWithLabel(null, "sessions")
  const [classes, setClasses] = useStateWithLabel(null, "classes")
  const [semesters, setSemesters] = useStateWithLabel(null, "semesters")
  const [lectureHalls, setLectureHalls] = useStateWithLabel(
    null,
    "lectureHalls"
  )
  const [classrooms, setClassrooms] = useStateWithLabel(null, "classrooms")
  const [departmentInput, setDepartmentInput] = useStateWithLabel(
    "",
    "departmentInput"
  )
  const [subjectTypeInput, setSubjectTypeInput] = useStateWithLabel(
    "0",
    "subjectTypeInput"
  )
  const [subjectNameInput, setSubjectNameInput] = useStateWithLabel(
    "",
    "subjectNameInput"
  )
  const [lecturerInput, setLecturerInput] = useStateWithLabel(
    "",
    "lecturerInput"
  )
  const [sessionInput, setSessionInput] = useStateWithLabel("", "sessionInput")
  const [classInput, setClassInput] = useStateWithLabel("", "classInput")
  const [semesterInput, setSemesterInput] = useStateWithLabel(
    "",
    "sessionInput"
  )
  const [startPeriodInput, setStartPeriodInput] = useStateWithLabel(
    "1",
    "startPeriodInput"
  )
  const [endPeriodInput, setEndPeriodInput] = useStateWithLabel(
    "1",
    "endPeriodInput"
  )
  const [weekDayInput, setWeekDayInput] = useStateWithLabel("2", "weekDayInput")
  const [startDayInput, setStartDayInput] = useStateWithLabel(
    "",
    "startDayInput"
  )
  const [endDayInput, setEndDayInput] = useStateWithLabel("", "endDayInput")
  const [periodTypeInput, setPeriodTypeInput] = useStateWithLabel(
    "0",
    "periodTypeInput"
  )
  const [lectureHallInput, setLectureHallInput] = useStateWithLabel(
    "",
    "lectureHallInput"
  )
  const [classroomInput, setClassroomInput] = useStateWithLabel(
    "",
    "classroomInput"
  )
  const authRequest = useAuthRequest()

  const getAllDepartments = () => authRequest.get(`/api/departments`)
  const getSubjectsWithTypeAndDepartment = (subjectType, departmentId) =>
    authRequest.get(
      `/api/admin/subjects?subjectType=${subjectType}&departmentId=${departmentId}`
    )
  const getLecturersWithDepartment = (departmentId) =>
    authRequest.get(`/api/admin/lecturers?departmentId=${departmentId}`)
  const getAllSessions = () => authRequest.get(`/api/admin/sessions`)
  const getSemestersWithSession = (sessionId) =>
    authRequest.get(`/api/semesters?sessionId=${sessionId}`)
  const getClassesWithDepartmentAndSession = (departmentId, sessionId) =>
    authRequest.get(
      `/api/admin/classes?departmentId=${departmentId}&sessionId=${sessionId}`
    )
  const getAllLectureHalls = () => authRequest.get(`/api/lecturerHalls`)
  const getClassroomsWithLecturerHalls = (lectureHallId) =>
    authRequest.get(`/api/admin/classrooms?lectureHallId=${lectureHallId}`)

  useEffect(async () => {
    const departmentsData = await getAllDepartments()
    const sessionsData = await getAllSessions()
    const lectureHallsData = await getAllLectureHalls()

    setDepartments(departmentsData.data)
    setSessions(sessionsData.data)
    setLectureHalls(lectureHallsData.data)

    if (departmentsData.data.length > 0) {
      setDepartmentInput(departmentsData.data[0].id.toString())
    }
    if (sessionsData.data.length > 0) {
      setSessionInput(sessionsData.data[0].id.toString())
    }
    if (lectureHallsData.data.length > 0) {
      setLectureHallInput(lectureHallsData.data[0].id.toString())
    }
  }, [])
  useEffect(async () => {
    if (departmentInput.length > 0 && subjectTypeInput.length > 0) {
      const subjectsData = await getSubjectsWithTypeAndDepartment(
        subjectTypeInput,
        departmentInput
      )
      setSubjects(subjectsData.data)
      if (subjectsData.data.length > 0) {
        setSubjectNameInput(subjectsData.data[0].id.toString())
      }
    }
  }, [departmentInput, subjectTypeInput])
  useEffect(async () => {
    if (departmentInput.length > 0) {
      const lecturersData = await getLecturersWithDepartment(departmentInput)
      setLecturers(lecturersData.data)
      if (lecturersData.data.length > 0) {
        setLecturerInput(lecturersData.data[0].id)
      }
    }
  }, [departmentInput])
  useEffect(async () => {
    if (sessionInput.length > 0) {
      const semestersData = await getSemestersWithSession(sessionInput)
      setSemesters(semestersData.data)
      if (semestersData.data.length > 0) {
        setSemesterInput(semestersData.data[0].id.toString())
      }
    }
  }, [sessionInput])
  useEffect(async () => {
    if (sessionInput.length > 0 && departmentInput.length > 0) {
      const classesData = await getClassesWithDepartmentAndSession(
        departmentInput,
        sessionInput
      )
      setClasses(classesData.data)
      if (classesData.data.length > 0) {
        setClassInput(classesData.data[0].id.toString())
      }
    }
  }, [sessionInput, departmentInput])
  useEffect(async () => {
    if (lectureHallInput.length > 0) {
      const classroomsData = await getClassroomsWithLecturerHalls(
        lectureHallInput
      )
      setClassrooms(classroomsData.data)
      if (classroomsData.data.length > 0) {
        setClassroomInput(classroomsData.data[0].id)
      }
    }
  }, [lectureHallInput])

  const onDepartmentInputChange = (e) => {
    setDepartmentInput(e.target.value)
  }
  const onSubjectTypeInputChange = (e) => {
    setSubjectTypeInput(e.target.value)
  }
  const onSubjectNameInputChange = (e) => {
    setSubjectNameInput(e.target.value)
  }
  const onLecturerInputChange = (e) => {
    setLecturerInput(e.target.value)
  }
  const onSessionInputChange = (e) => {
    setSessionInput(e.target.value)
  }
  const onClassInputChange = (e) => {
    setClassInput(e.target.value)
  }
  const onSemesterInputChange = (e) => {
    setSemesterInput(e.target.value)
  }
  const onStartPeriodInputChange = (e) => {
    setStartPeriodInput(e.target.value)
  }
  const onEndPeriodInputChange = (e) => {
    setEndPeriodInput(e.target.value)
  }
  const onWeekDayInputChange = (e) => {
    setWeekDayInput(e.target.value)
  }
  const onStartDayInputChange = (e) => {
    setStartDayInput(e.target.value)
  }
  const onEndDayInputChange = (e) => {
    setEndDayInput(e.target.value)
  }
  const onPeriodTypeInputChange = (e) => {
    setPeriodTypeInput(e.target.value)
  }
  const onLectureHallInputChange = (e) => {
    setLectureHallInput(e.target.value)
  }
  const onClassroomInputChange = (e) => {
    setClassroomInput(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authRequest({
        method: "POST",
        url: `/api/admin/schedules`,
        data: {
          subjectType: parseInt(subjectTypeInput, 10),
          subject: parseInt(subjectNameInput, 10),
          department: parseInt(departmentInput, 10),
          lecturer: parseInt(lecturerInput, 10),
          session: parseInt(sessionInput, 10),
          classId: parseInt(classInput, 10),
          semester: parseInt(semesterInput, 10),
          startPeriod: parseInt(startPeriodInput, 10),
          endPeriod: parseInt(endPeriodInput, 10),
          startDay: startDayInput,
          endDay: endDayInput,
          periodType: parseInt(periodTypeInput, 10),
          classroomId: parseInt(classroomInput, 10),
          week: parseInt(weekDayInput, 10),
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      // eslint-disable-next-line no-console
      console.log(response.data)
      window.alert("Thêm Thời Khoá Biểu Thành Công!")
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      window.alert(`Thêm Thời Khoá Biểu Thất Bại!`)
    }
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          Khoa
          <div>
            <select
              className="form-control"
              id="departmentInput"
              value={departmentInput}
              onChange={onDepartmentInputChange}
            >
              {departments && (
                <BasicOption
                  options={departments}
                  valueProperty="id"
                  content="name"
                />
              )}
            </select>
          </div>
        </div>
        <div className="form-group">
          Kiểu Môn
          <select
            className="form-control"
            id="subjectTypeInput"
            value={subjectTypeInput}
            onChange={onSubjectTypeInputChange}
          >
            <option value="0">lý thuyết</option>
            <option value="1">thực hành</option>
          </select>
        </div>
        <div className="form-group">
          Tên Môn
          <select
            className="form-control"
            id="subjectInput"
            value={subjectNameInput}
            onChange={onSubjectNameInputChange}
          >
            {subjects && (
              <BasicOption
                options={subjects}
                valueProperty="id"
                content="name"
              />
            )}
          </select>
        </div>
        <div className="form-group">
          Giảng Viên
          <div>
            <select
              className="form-control"
              id="lecturerInput"
              value={lecturerInput}
              onChange={onLecturerInputChange}
            >
              {lecturers && (
                <BasicOption
                  options={lecturers}
                  valueProperty="id"
                  content="name"
                />
              )}
            </select>
          </div>
        </div>
        <div className="form-group">
          Khoá
          <select
            className="form-control"
            id="sessionInput"
            value={sessionInput}
            onChange={onSessionInputChange}
          >
            {sessions && (
              <BasicOption
                options={sessions}
                valueProperty="id"
                content="name"
              />
            )}
          </select>
        </div>
        <div className="form-group">
          Lớp
          <select
            className="form-control"
            id="classInput"
            value={classInput}
            onChange={onClassInputChange}
          >
            {classes && (
              <BasicOption
                options={classes}
                valueProperty="id"
                content="name"
              />
            )}
          </select>
        </div>
        <div className="form-group">
          Học Kỳ
          <select
            className="form-control"
            id="semesterInput"
            value={semesterInput}
            onChange={onSemesterInputChange}
          >
            {semesters && (
              <BasicOption
                options={semesters}
                valueProperty="id"
                content="termNumber"
              />
            )}
          </select>
        </div>
        <div className="form-group">
          Tiết Bắt Đầu
          <select
            className="form-control"
            id="startPeriodInput"
            value={startPeriodInput}
            onChange={onStartPeriodInputChange}
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
          Tiết Kết Thúc
          <select
            className="form-control"
            id="endPeriodInput"
            value={endPeriodInput}
            onChange={onEndPeriodInputChange}
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
          Thứ
          <select
            className="form-control"
            id="weekDayInput"
            value={weekDayInput}
            onChange={onWeekDayInputChange}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div className="form-group">
          Ngày Bắt Đầu
          <input
            className="form-control"
            type="date"
            value={startDayInput}
            onChange={onStartDayInputChange}
            id="startDayInput"
          />
        </div>
        <div className="form-group">
          Ngày Kết Thúc
          <input
            className="form-control"
            type="date"
            value={endDayInput}
            onChange={onEndDayInputChange}
            id="endDayInput"
          />
        </div>
        <div className="form-group">
          Buổi
          <select
            className="form-control"
            id="periodType"
            value={periodTypeInput}
            onChange={onPeriodTypeInputChange}
          >
            <option value="0">Sáng</option>
            <option value="1">Chiều</option>
            <option value="2">Tối</option>
          </select>
        </div>
        <div className="form-group">
          Chọn Giảng Đường
          <select
            className="form-control"
            id="lectureHall"
            value={lectureHallInput}
            onChange={onLectureHallInputChange}
          >
            {lectureHalls && (
              <BasicOption
                options={lectureHalls}
                valueProperty="id"
                content="name"
              />
            )}
          </select>
        </div>
        <div className="form-group">
          Chọn Phòng Học
          <select
            className="form-control"
            id="classroom"
            value={classroomInput}
            onChange={onClassroomInputChange}
          >
            {classrooms && (
              <BasicOption
                options={classrooms}
                valueProperty="id"
                content="name"
              />
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </>
  )
}

export default ScheduleAdd
