import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useAuthRequest from "../../helpers/useAuthRequest"
import BasicSelect from "../../components/form/BasicSelect/BasicSelect"
import BasicOption from "../../components/form/BasicOption/BasicOption"

function StudentGrade() {
  const { student } = useSelector((state) => state.authentication.account)
  const authRequest = useAuthRequest()

  const [semesterInput, setSemesterInput] = useState("")
  const onSemesterInputChange = (e) => {
    setSemesterInput(e.target.value)
  }
  const [gradeTypeInput, setGradeTypeInput] = useState("0")
  const onGradeTypeInputChange = (e) => {
    setGradeTypeInput(e.target.value)
  }

  const [semesters, setSemesters] = useState()
  const fetchSemestersWithSession = (sessionId) =>
    authRequest.get(`/api/semesters?sessionId=${sessionId}`)

  useEffect(() => {
    document.title = "Xem Điểm Thi"
  }, [])

  useEffect(async () => {
    try {
      const fetchedSemesters = await fetchSemestersWithSession(
        student.session.id
      )
      setSemesters(fetchedSemesters.data)
      if (fetchedSemesters.data.length > 0) {
        setSemesterInput(fetchedSemesters.data[0].id)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])
  return (
    <>
      <h1>Xem Điểm Thi</h1>
      <BasicSelect
        label="Chọn Học Kỳ"
        onChange={onSemesterInputChange}
        value={semesterInput}
      >
        <BasicOption
          options={semesters}
          keyLabel="id"
          valueLabel="id"
          content="termNumber"
        />
      </BasicSelect>
      <BasicSelect
        label="Loại Điểm"
        value={gradeTypeInput}
        onChange={onGradeTypeInputChange}
      >
        <BasicOption
          options={[
            { id: 0, name: "Lý Thuyết" },
            { id: 1, name: "Thực Hành" },
          ]}
          keyLabel="id"
          valueLabel="id"
          content="name"
        />
      </BasicSelect>
    </>
  )
}

export default StudentGrade
