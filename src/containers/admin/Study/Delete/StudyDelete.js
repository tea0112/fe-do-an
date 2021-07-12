import { memo, useEffect, useState } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import DeleteTable from "./DeleteTable"
import BasicSelect from "../../../../components/admin/form/BasicSelect/BasicSelect"
import BasicOption from "../../../../components/admin/form/BasicOption/BasicOption"

// eslint-disable-next-line no-unused-vars
function StudyAdd() {
  useEffect(() => {
    document.title = "Xóa Điểm Thi"
  }, [])

  const axiosAuthRequest = useAuthRequest()
  const [isFetching, setIsFetching] = useState(false)
  const [sessions, setSessions] = useState(null)
  const [departments, setDepartments] = useState(null)
  const [classes, setClasses] = useState(null)
  const [sessionInput, setSessionInput] = useState("")
  const [departmentInput, setDepartmentInput] = useState("")
  const [classInput, setClassInput] = useState("")
  const [subjectTypeSelect, setSubjectTypeSelect] = useState("0")
  const [subjectInput, setSubjectInput] = useState("")
  const onSubjectInputChange = (e) => {
    setSubjectInput(e.target.value)
  }
  const [subjects, setSubjects] = useState(null)
  const [semesters, setSemesters] = useState(null)
  const [semesterInput, setSemesterInput] = useState("")
  const onSemesterInputChange = (e) => {
    setSemesterInput(e.target.value)
  }
  const [studies, setStudies] = useState(null)

  const getSessionPromise = () => axiosAuthRequest.get("/api/admin/sessions")
  const getDepartmentPromise = () => axiosAuthRequest.get("/api/departments")
  const getClasses = (sessionId, departmentId) =>
    axiosAuthRequest.get(
      `/api/classes?sessionId=${sessionId}&departmentId=${departmentId}`
    )
  const fetchSemesters = (sessionId) =>
    axiosAuthRequest.get(`/api/semesters?sessionId=${sessionId}`)
  const fetchSubjects = (subjectType, department) =>
    axiosAuthRequest.get(
      `/api/admin/subjects?subjectType=${subjectType}&departmentId=${department}`
    )
  const fetchStudies = (subjectId, semesterId) =>
    axiosAuthRequest.get(
      `/api/studies/filter?subjectId=${subjectId}&semesterId=${semesterId}`
    )

  useEffect(() => {
    Promise.all([getSessionPromise(), getDepartmentPromise()]).then(
      ([sessionArr, departmentArr]) => {
        setSessions(sessionArr.data)
        setDepartments(departmentArr.data)

        if (sessionArr.data.length > 0 && departmentArr.data.length > 0) {
          setSessionInput(sessionArr.data[0].id.toString())
          setDepartmentInput(departmentArr.data[0].id.toString())

          getClasses(
            sessionArr.data[0].id.toString(),
            departmentArr.data[0].id.toString()
          )
            .then((fetchedClasses) => {
              setClasses(fetchedClasses.data)
              if (fetchedClasses.data.length > 0) {
                setClassInput(fetchedClasses.data[0].id.toString())
              }
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err))
        }
      }
    )
  }, [])
  useEffect(() => {
    if (sessionInput.length > 0 && departmentInput.length > 0) {
      getClasses(sessionInput, departmentInput)
        .then((fetchedClasses) => {
          setClasses(fetchedClasses.data)
          if (fetchedClasses.data.length > 0) {
            setClassInput(fetchedClasses.data[0].id.toString())
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    }
  }, [sessionInput, departmentInput])
  useEffect(async () => {
    if (subjectTypeSelect.length > 0 && departmentInput.length > 0) {
      const fetchedSubjects = await fetchSubjects(
        subjectTypeSelect,
        departmentInput
      )
      setSubjects(fetchedSubjects.data)
      if (fetchedSubjects.data.length > 0) {
        setSubjectInput(fetchedSubjects.data[0].id.toString())
      }
    }
  }, [subjectTypeSelect, departmentInput])
  useEffect(async () => {
    if (sessionInput.length > 0) {
      try {
        const fetchedSemesters = await fetchSemesters(sessionInput)
        setSemesters(fetchedSemesters.data)
        if (fetchedSemesters.data.length > 0) {
          setSemesterInput(fetchedSemesters.data[0].id.toString())
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
  }, [sessionInput])

  // onChange
  const handleDepartmentChange = (e) => {
    setDepartmentInput(e.target.value)
  }
  const handleClassChange = (e) => {
    setClassInput(e.target.value)
  }

  // onClick
  const handleClassClick = () => {}

  // onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    if (subjectInput.length > 0 && semesterInput.length > 0) {
      try {
        const fetchedStudies = await fetchStudies(subjectInput, semesterInput)
        setStudies(fetchedStudies.data)
        setIsFetching(false)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        setIsFetching(false)
      }
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

  const handleSessionChange = (e) => {
    setSessionInput(e.target.value)
  }
  const onSubjectTypeSelectChange = (e) => {
    setSubjectTypeSelect(e.target.value)
  }
  return (
    <>
      <h1>Xóa Điểm Thi</h1>
      <form name="addStudent" onSubmit={handleSubmit}>
        <BasicSelect
          id="sessionInput"
          onChange={handleSessionChange}
          value={sessionInput}
          label="Niên Khoá"
        >
          <BasicOption
            options={sessions}
            valueLabel="id"
            keyLabel="id"
            content="name"
          />
        </BasicSelect>
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
        <BasicSelect
          id="subjectTypeSelect"
          label="Kiểu Môn"
          value={subjectTypeSelect}
          onChange={onSubjectTypeSelectChange}
        >
          <BasicOption
            options={[
              { id: 0, name: "Lý Thuyết" },
              { id: 1, name: "Thực Hành" },
            ]}
            valueLabel="id"
            keyLabel="id"
            content="name"
          />
        </BasicSelect>
        <BasicSelect
          id="subjectInput"
          label="Môn"
          value={subjectInput}
          onChange={onSubjectInputChange}
        >
          <BasicOption
            options={subjects}
            keyLabel="id"
            valueLabel="id"
            content="name"
          />
        </BasicSelect>
        <BasicSelect
          id="semesterInput"
          label="Học Kỳ"
          value={semesterInput}
          onChange={onSemesterInputChange}
        >
          <BasicOption
            options={semesters}
            keyLabel="id"
            valueLabel="id"
            content="termNumber"
          />
        </BasicSelect>
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
        {studies && <DeleteTable studies={studies} setStudies={setStudies} />}
      </div>
    </>
  )
}

export default memo(StudyAdd)
