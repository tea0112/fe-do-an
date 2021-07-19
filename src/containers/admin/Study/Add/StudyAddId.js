import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import queryString from "query-string"
import BasicInput from "../../../../components/form/BasicInput/BasicInput"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import FormError from "../../../../components/FormError/FormError"
import validateGrade from "../../../../helpers/validations/validateGrade"
import BasicSelect from "../../../../components/form/BasicSelect/BasicSelect"
import BasicOption from "../../../../components/form/BasicOption/BasicOption"
import BasicButton from "../../../../components/form/BasicButton/BasicButton"

function StudyAddId() {
  useEffect(() => {
    document.title = "Thêm Điểm Thi"
  }, [])

  const { id } = useParams()
  const authRequest = useAuthRequest()
  const { departmentId } = queryString.parse(window.location.search)

  // state, onChange
  const [gradeInput, setGradeInput] = useState("")
  const [gradeErrorMessage, setGradeErrorMessage] = useState("")
  const onGradeChange = (e) => {
    const formattedGrade = e.target.value.replace(",", ".")
    setGradeInput(formattedGrade)
    const validateGradeResult = validateGrade(formattedGrade)
    setGradeErrorMessage(validateGradeResult.errorMessage)
  }

  const [student, setStudent] = useState(null)

  const [semesters, setSemesters] = useState(null)
  const [semesterInput, setSemesterInput] = useState("")
  const onSemesterInputChange = (e) => {
    setSemesterInput(e.target.value)
  }

  const [subjectTypeInput, setSubjectTypeInput] = useState("0")
  const onSubjectTypeInputChange = (e) => {
    setSubjectTypeInput(e.target.value)
  }

  const [subjectInput, setSubjectInput] = useState("")
  const onSubjectInputChange = (e) => {
    setSubjectInput(e.target.value)
  }

  const [subjects, setSubjects] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  // fetch, push
  const fetchSemesters = (sessionId) =>
    authRequest.get(`/api/semesters?sessionId=${sessionId}`)
  const fetchStudent = (studentId) =>
    authRequest.get(`/api/admin/students/${studentId}`)
  const fetchSubjects = (subjectType, department) =>
    authRequest.get(
      `/api/admin/subjects?subjectType=${subjectType}&departmentId=${department}`
    )
  const addGrade = () =>
    authRequest({
      url: `/api/admin/studies`,
      method: "POST",
      data: {
        grade: gradeInput,
        subjectId: subjectInput,
        semesterId: semesterInput,
        studentId: student.id,
      },
    })

  // effect
  useEffect(async () => {
    try {
      const fetchedStudent = await fetchStudent(id)
      setStudent(fetchedStudent.data)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }, [])
  useEffect(async () => {
    if (student) {
      try {
        const fetchedSemesters = await fetchSemesters(student.session.id)
        setSemesters(fetchedSemesters.data)
        if (fetchedSemesters.data.length > 0) {
          setSemesterInput(fetchedSemesters.data[0].id)
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
  }, [student])
  useEffect(async () => {
    const fetchedSubjects = await fetchSubjects(subjectTypeInput, departmentId)
    setSubjects(fetchedSubjects.data)
    if (fetchedSubjects.data.length > 0) {
      setSubjectInput(fetchedSubjects.data[0].id)
    }
  }, [subjectTypeInput])

  // submit
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await addGrade()
      setIsLoading(false)
      alert("Thêm Điểm Thi Thành Công")
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      setIsLoading(false)
      alert(
        "Thêm Điểm Thi Thất Bại.\nKhông Được Trùng Điểm Thi Của Môn Trong Một Kỳ"
      )
    }
  }
  return (
    <>
      <h1>Thêm Điểm Cho Sinh Viên</h1>
      <h5>
        {student && (
          <>
            {student.user.username} - {student.firstName} {student.lastName}
          </>
        )}
      </h5>
      <form onSubmit={onSubmit}>
        <BasicInput
          id="gradeInput"
          label="Điểm Thi"
          value={gradeInput}
          onChange={onGradeChange}
        />
        <FormError errorMessage={gradeErrorMessage} />

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
        <BasicSelect
          id="subjectTypeInput"
          label="Kiểu Môn"
          value={subjectTypeInput}
          onChange={onSubjectTypeInputChange}
        >
          <BasicOption
            options={[
              { id: 0, name: "Lý Thuyết" },
              { id: 1, name: "Thực Hành" },
            ]}
            content="name"
            keyLabel="id"
            valueLabel="id"
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
        <BasicButton
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          Thêm
        </BasicButton>
      </form>
    </>
  )
}

export default StudyAddId
