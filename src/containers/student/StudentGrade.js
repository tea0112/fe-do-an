import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  Add,
  ArrowUpward,
  Cancel,
  Check,
  Clear,
  Delete,
  Edit as EditIcon,
  FilterList,
  FirstPage,
  ImportExport,
  LastPage,
  NavigateBefore,
  NavigateNext,
  Replay,
  Search,
} from "@material-ui/icons"
import MaterialTable from "material-table"
import useAuthRequest from "../../helpers/useAuthRequest"
import BasicSelect from "../../components/form/BasicSelect/BasicSelect"
import BasicOption from "../../components/form/BasicOption/BasicOption"

const columns = [
  { title: "Môn", field: "subject.name" },
  { title: "Điểm", field: "grade" },
]

const localization = {
  header: {
    actions: "",
  },
  toolbar: {
    searchPlaceholder: "Tìm Kiếm",
    exportTitle: "Xuất",
  },
  pagination: {
    labelRowsSelect: "Dòng",
    labelDisplayedRows: "{from}-{to} của {count}",
  },
  body: {
    emptyDataSourceMessage: "Không Tồn Tại Bản Ghi Nào",
    editTooltip: "Sửa",
    editRow: {
      cancelTooltip: "Huỷ bỏ",
      saveTooltip: "Tiếp tục",
    },
  },
}

const icons = {
  Export: ImportExport,
  Delete,
  Add,
  Check,
  Cancel,
  Clear,
  Edit: EditIcon,
  Search,
  ResetSearch: Clear,
  FirstPage,
  LastPage,
  NextPage: NavigateNext,
  PreviousPage: NavigateBefore,
  Filter: FilterList,
  Retry: Replay,
  SortArrow: ArrowUpward,
}

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

  // eslint-disable-next-line no-unused-vars
  const [grades, setGrades] = useState([])
  const fetchGrades = (gradeType, semesterId, studentId) =>
    authRequest.get(
      `/api/studies/filter?studentId=${studentId}&gradeType=${gradeType}&semesterId=${semesterId}`
    )

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
        setSemesterInput(fetchedSemesters.data[0].id.toString())
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])

  useEffect(async () => {
    try {
      if (semesterInput.length > 0 && gradeTypeInput.length > 0) {
        const fetchedGrades = await fetchGrades(
          gradeTypeInput,
          semesterInput,
          student.id
        )
        setGrades(fetchedGrades.data)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }, [semesterInput, gradeTypeInput])

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

      <MaterialTable
        title={gradeTypeInput === "0" ? "Lý Thuyết" : "Thực Hành"}
        icons={icons}
        columns={columns}
        localization={localization}
        data={grades}
        options={{
          exportButton: { csv: true, pdf: false },
        }}
      />
    </>
  )
}

export default StudentGrade
