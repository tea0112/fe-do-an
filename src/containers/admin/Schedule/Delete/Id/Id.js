import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import useAuthRequest from "../../../../../helpers/useAuthRequest"

function EditId() {
  const { scheduleId } = useParams()
  const authRequest = useAuthRequest()
  const [schedule, setSchedule] = useState(null)
  const [id, setId] = useState(null)
  const [departments, setDepartments] = useState(null)
  const [subjects, setSubjects] = useState(null)
  const [lecturers, setLecturers] = useState(null)
  const [sessions, setSessions] = useState(null)
  const [classes, setClasses] = useState(null)
  const [semesters, setSemesters] = useState(null)
  const [startDayInput, setStartDayInput] = useState(null)
  const [endDayInput, setEndDayInput] = useState(null)
  const [periodType, setPeriodType] = useState(null)
  const [subjectType, setSubjectType] = useState(null)
  const [subjectName, setSubjectName] = useState(null)
  const [lectureHall, setLectureHall] = useState(null)
  const [classroom, setClassroom] = useState(null)
  const [lectureHalls, setLectureHalls] = useState(null)
  const [classrooms, setClassrooms] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const departmentRef = useRef()
  const subjectTypeRef = useRef()
  const subjectRef = useRef()
  const sessionRef = useRef()
  const periodTypeRef = useRef()
  const endDayRef = useRef()
  const startDayRef = useRef()
  const weekDayRef = useRef()
  const endPeriodRef = useRef()
  const startPeriodRef = useRef()
  const semesterRef = useRef()
  const classRef = useRef()
  const lecturerRef = useRef()

  // fetch
  const getSchedule = () =>
    authRequest.get(`/api/admin/schedules/${scheduleId}`)
  const getAllDepartment = () => authRequest.get(`/api/departments`)
  const getSubject = (subjectTypeId, departmentId) =>
    authRequest.get(
      `/api/admin/subjects?subjectType=${subjectTypeId}&departmentId=${departmentId}`
    )
  const getLecturer = (departmentId) =>
    authRequest.get(`/api/admin/lecturers?departmentId=${departmentId}`)
  const getSession = () => authRequest.get(`/api/admin/sessions`)
  const getClasses = (departmentId, sessionId) =>
    authRequest.get(
      `/api/classes?departmentId=${departmentId}&sessionId=${sessionId}`
    )
  const getSemesters = (sessionId) =>
    authRequest.get(`/api/semesters?sessionId=${sessionId}`)
  const getLectureHall = () => authRequest.get(`/api/lecturerHalls`)

  const getClassroomWithLectureHallId = (lectureHallId) =>
    authRequest.get(`/api/admin/classrooms?lectureHallId=${lectureHallId}`)

  useEffect(async () => {
    getSchedule()
      .then((response) => {
        setSchedule(response.data)
        setStartDayInput(response.data.startDay)
        setEndDayInput(response.data.endDay)
        setId(response.data.id)
        setSubjectType(response.data.subject.subjectType)
        setSubjectName(response.data.subject.id)
        setPeriodType(response.data.periodType)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    getAllDepartment()
      .then((response) => {
        setDepartments(response)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    const lectureHallsData = await getLectureHall()
    setLectureHalls(lectureHallsData.data)
  }, [])
  useEffect(() => {
    getSession()
      .then((sessionsData) => setSessions(sessionsData))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    if (schedule) {
      getSemesters(schedule.semester.session.id)
        .then((semestersData) => setSemesters(semestersData))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    }
  }, [schedule])
  useEffect(() => {
    if (schedule) {
      getSubject(subjectTypeRef.current.value, schedule.subject.department.id)
        .then((subjectsData) => setSubjects(subjectsData))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    }
  }, [schedule])
  useEffect(() => {
    if (schedule) {
      getLecturer(schedule.subject.department.id)
        .then((lecturersData) => setLecturers(lecturersData))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    }
  }, [schedule])
  useEffect(() => {
    if (schedule) {
      setLectureHall(schedule.classroom.lectureHall.id)
      setClassroom(schedule.classroom.id)
      getClasses(schedule.subject.department.id, schedule.semester.session.id)
        .then((classesData) => setClasses(classesData))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    }
  }, [schedule])
  useEffect(() => {
    if (subjectType) {
      getSubject(subjectTypeRef.current.value, departmentRef.current.value)
        .then((subjectsData) => setSubjects(subjectsData))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    }
  }, [subjectType])
  useEffect(async () => {
    if (lectureHall) {
      const classroomsData = await getClassroomWithLectureHallId(lectureHall)
      setClassrooms(classroomsData.data)
    }
  }, [lectureHall])

  // component
  const departmentOption = (departmentData, currentDepartment) =>
    departmentData.data.map((department) => {
      if (department.id === currentDepartment.id) {
        return (
          <option key={department.id} value={department.id} selected>
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
  const subjectOption = (subjectData, currentSubject) =>
    subjectData.data.map((subject) => {
      if (subject.id === currentSubject.id) {
        return (
          <option key={subject.id} value={subject.id} selected>
            {subject.name}
          </option>
        )
      }
      return (
        <option key={subject.id} value={subject.id}>
          {subject.name}
        </option>
      )
    })
  const lecturerOption = (lecturerData, currentLecturer) =>
    lecturerData.data.map((lecturer) => {
      if (lecturer.id === currentLecturer.id) {
        return (
          <option key={lecturer.id} value={lecturer.id} selected>
            {lecturer.name}
          </option>
        )
      }
      return (
        <option key={lecturer.id} value={lecturer.id}>
          {lecturer.name}
        </option>
      )
    })
  const sessionOption = (sessionData, currentSession) =>
    sessionData.data.map((session) => {
      if (session.id === currentSession.id) {
        return (
          <option key={session.id} value={session.id} selected>
            {session.name}
          </option>
        )
      }
      return (
        <option key={session.id} value={session.id}>
          {session.name}
        </option>
      )
    })
  const classOption = (classData, currentClass) =>
    classData.data.map((clazz) => {
      if (clazz.id === currentClass.id) {
        return (
          <option key={clazz.id} value={clazz.id} selected>
            {clazz.name}
          </option>
        )
      }
      return (
        <option key={clazz.id} value={clazz.id}>
          {clazz.name}
        </option>
      )
    })
  const semesterOption = (semesterData, currentSemester) =>
    semesterData.data.map((semester) => {
      if (semester.id === currentSemester.id) {
        return (
          <option key={semester.id} value={semester.id} selected>
            {semester.termNumber}
          </option>
        )
      }
      return (
        <option key={semester.id} value={semester.id}>
          {semester.termNumber}
        </option>
      )
    })
  const startPeriodOption = (currentStartPeriod) =>
    Array(6)
      .fill(null)
      .map((e, i) => {
        const periodNumber = i + 1
        if (periodNumber === currentStartPeriod) {
          return (
            <option key={periodNumber} value={periodNumber} selected>
              {periodNumber}
            </option>
          )
        }
        return (
          <option key={periodNumber} value={periodNumber}>
            {periodNumber}
          </option>
        )
      })
  const endPeriodOption = (currentEndPeriod) =>
    Array(6)
      .fill(null)
      .map((e, i) => {
        const periodNumber = i + 1
        if (periodNumber === currentEndPeriod) {
          return (
            <option key={periodNumber} value={periodNumber} selected>
              {periodNumber}
            </option>
          )
        }
        return (
          <option key={periodNumber} value={periodNumber}>
            {periodNumber}
          </option>
        )
      })
  const weekDayOption = (currentWeekDayData) =>
    Array(7)
      .fill(null)
      .map((e, i) => {
        const periodNumber = i + 2
        if (currentWeekDayData === periodNumber) {
          return (
            <option key={periodNumber} value={periodNumber} selected>
              {periodNumber}
            </option>
          )
        }
        return (
          <option key={periodNumber} value={periodNumber}>
            {periodNumber}
          </option>
        )
      })
  const periodTypeOption = (current) =>
    Array(3)
      .fill(null)
      .map((e, i) => {
        if (current === i) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <option key={i} value={i}>
              {i === 0 && "Sáng"}
              {i === 1 && "Chiều"}
              {i === 2 && "Tối"}
            </option>
          )
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <option key={i} value={i}>
            {i === 0 && "Sáng"}
            {i === 1 && "Chiều"}
            {i === 2 && "Tối"}
          </option>
        )
      })
  const lectureHallOption = (lectureHallsData) =>
    lectureHallsData.map((lectureHallElement) => (
      <option key={lectureHallElement.id} value={lectureHallElement.id}>
        {lectureHallElement.name} - {lectureHallElement.address}
      </option>
    ))
  const classroomOption = (classroomData) =>
    classroomData.map((classroomElm) => (
      <option key={classroomElm.id} value={classroomElm.id}>
        {classroomElm.name}
      </option>
    ))
  // onChange
  const subjectNameChange = (e) => {
    setSubjectName(e.target.value)
  }
  const handleChangeDepartment = (e) => {
    getSubject(subjectTypeRef.current.value, e.target.value)
      .then((subjectsData) => setSubjects(subjectsData))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
    getLecturer(e.target.value)
      .then((lecturersData) => setLecturers(lecturersData))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
    getClasses(e.target.value, sessionRef.current.value).then((classesData) =>
      setClasses(classesData)
    )
  }
  const onSubjectTypeChange = (e) => {
    setSubjectType(e.target.value)
  }
  const handlePeriodTypeChange = (e) => {
    setPeriodType(e.target.value)
  }
  const handleClassChange = (e) => {
    e.preventDefault()
  }
  const handleSessionChange = (e) => {
    getClasses(departmentRef.current.value, e.target.value)
      .then((classesData) => setClasses(classesData))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
    getSemesters(e.target.value)
      .then((semestersData) => setSemesters(semestersData))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }
  const handleSelectLectureHallChange = (e) => {
    setLectureHall(e.target.value)
  }
  const handleClassroomChange = (e) => {
    setClassroom(e.target.value)
  }

  // onSubmit
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await authRequest({
        method: "PATCH",
        url: `/api/admin/schedules/${scheduleId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          startDay: startDayRef.current.value,
          endDay: endDayRef.current.value,
          weekDay: weekDayRef.current.value,
          periodType: periodTypeRef.current.value,
          startPeriod: startPeriodRef.current.value,
          endPeriod: endPeriodRef.current.value,
          semester: semesterRef.current.value,
          lecturer: lecturerRef.current.value,
          subject: subjectRef.current.value,
          classes: classRef.current.value,
          classroomId: parseInt(classroom, 10),
        },
      })
      if (response.data.message) {
        setIsLoading(false)
        window.alert(
          `Cập Nhật Thời Khoá Biểu Thất Bại.\n${response.data.message}`
        )
      } else {
        setIsLoading(false)
        alert("Cập Nhật Thành Công")
        getSchedule()
          .then((responseInfo) => {
            setSchedule(responseInfo.data)
            setStartDayInput(responseInfo.data.startDay)
            setEndDayInput(responseInfo.data.endDay)
            setId(responseInfo.data.id)
            setSubjectType(responseInfo.data.subject.subjectType)
            setSubjectName(responseInfo.data.subject.id)
            setPeriodType(responseInfo.data.periodType)
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      }
    } catch (err) {
      setIsLoading(false)
      alert(`Cập Nhật Thất Bại ${err}`)
    }
  }
  return (
    <div>
      <div className="font-weight-bold">
        Chỉnh sửa cho thời khoá biểu:{" "}
        {schedule && (
          <span>
            {schedule.id} - {schedule.classes.name} - &nbsp;
            {schedule.subject.name} -{" "}
            {schedule.subject.subjectType ? "thực hành" : "lý thuyết"} - &nbsp;
            {schedule.lecturer.name}
          </span>
        )}
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          {schedule && (
            <input
              type="text"
              id="idInput"
              value={id}
              style={{ display: "none" }}
            />
          )}
        </div>
        <div className="form-group">
          Khoa
          <select
            className="form-control"
            ref={departmentRef}
            id="departmentInput"
            onChange={handleChangeDepartment}
          >
            {schedule &&
              departments &&
              departmentOption(departments, schedule.classes.department)}
          </select>
        </div>
        <div className="form-group">
          Kiểu Môn
          <select
            className="form-control"
            ref={subjectTypeRef}
            id="subjectTypeInput"
            value={subjectType}
            onChange={onSubjectTypeChange}
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
            value={subjectName}
            onChange={subjectNameChange}
            ref={subjectRef}
          >
            {schedule && subjects && subjectOption(subjects, schedule.subject)}
          </select>
        </div>
        <div className="form-group">
          Giảng Viên
          <div>
            <select
              className="form-control"
              id="lecturerInput"
              ref={lecturerRef}
            >
              {schedule &&
                departments &&
                lecturers &&
                lecturerOption(lecturers, schedule.lecturer)}
            </select>
          </div>
        </div>
        <div className="form-group">
          Khoá
          <select
            className="form-control"
            id="sessionInput"
            ref={sessionRef}
            onChange={handleSessionChange}
          >
            {schedule &&
              sessions &&
              sessionOption(sessions, schedule.classes.session)}
          </select>
        </div>
        <div className="form-group">
          Lớp
          <select
            className="form-control"
            id="classInput"
            ref={classRef}
            onChange={handleClassChange}
          >
            {schedule &&
              departments &&
              sessions &&
              classes &&
              classOption(classes, schedule.classes)}
          </select>
        </div>
        <div className="form-group">
          Học Kỳ
          <select className="form-control" ref={semesterRef} id="semesterInput">
            {schedule &&
              semesters &&
              sessions &&
              semesterOption(semesters, schedule.semester)}
          </select>
        </div>
        <div className="form-group">
          Tiết Bắt Đầu
          <select
            className="form-control"
            ref={startPeriodRef}
            id="startPeriodInput"
          >
            {schedule && startPeriodOption(schedule.startPeriod)}
          </select>
        </div>
        <div className="form-group">
          Tiết Kết Thúc
          <select
            className="form-control"
            ref={endPeriodRef}
            id="endPeriodInput"
          >
            {schedule && endPeriodOption(schedule.endPeriod)}
          </select>
        </div>
        <div className="form-group">
          Thứ
          <select className="form-control" ref={weekDayRef} id="weekDayInput">
            {schedule && weekDayOption(schedule.weekDay)}
          </select>
        </div>
        <div className="form-group">
          Ngày Bắt Đầu
          <input
            className="form-control"
            value={startDayInput}
            onChange={(e) => setStartDayInput(e.target.value)}
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
            value={endDayInput}
            ref={endDayRef}
            onChange={(e) => setEndDayInput(e.target.value)}
            id="endDayInput"
          />
        </div>
        <div className="form-group">
          Buổi
          <select
            className="form-control"
            id="periodType"
            ref={periodTypeRef}
            value={periodType && periodType}
            onChange={handlePeriodTypeChange}
          >
            {schedule && periodTypeOption(schedule.periodType)}
          </select>
        </div>
        <div className="form-group">
          Chọn Giảng Đường
          <select
            className="form-control"
            id="lectureHall"
            value={lectureHall}
            onChange={handleSelectLectureHallChange}
          >
            {lectureHalls && lectureHallOption(lectureHalls)}
          </select>
        </div>
        <div className="form-group">
          Chọn Phòng Học
          <select
            className="form-control"
            value={classroom}
            onChange={handleClassroomChange}
            id="classroom"
          >
            {classrooms && classroomOption(classrooms)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Cập Nhật
        </button>
      </form>
    </div>
  )
}

export default EditId
