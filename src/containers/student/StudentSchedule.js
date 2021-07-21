import MaterialTable from "material-table"
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
import { useEffect, useState } from "react"
import useAuthRequest from "../../helpers/useAuthRequest"

function StudentSchedule() {
  const columns = [
    { title: "Môn", field: "subject.name" },
    { title: "Giảng Viên", field: "lecturer.name" },
    { title: "Thứ", field: "weekDay" },
    {
      title: "Buổi",
      field: "periodType",
      lookup: {
        0: "Sáng",
        1: "Chiều",
        2: "Tối",
      },
    },
    { title: "Tiết Bắt Đầu", field: "startPeriod" },
    { title: "Tiết Kết Thúc", field: "endPeriod" },
    { title: "Giảng Đường", field: "classroom.lectureHall.name" },
    { title: "Phòng Học", field: "classroom.name" },
    { title: "Ngày Bắt Đầu", field: "startDay" },
    { title: "Ngày Kết Thúc", field: "endDay" },
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

  const [theorySchedules, setTheorySchedules] = useState(null)
  const [practiceSchedules, setPracticeSchedules] = useState(null)
  const authRequest = useAuthRequest()

  const fetchTheorySchedules = () => authRequest.get(`/api/schedules/theory`)
  const fetchPracticeSchedules = () =>
    authRequest.get(`/api/schedules/practice`)

  useEffect(async () => {
    try {
      const [fetchedTheorySchedules, fetchedPracticeSchedules] =
        await Promise.all([fetchTheorySchedules(), fetchPracticeSchedules()])
      setTheorySchedules(fetchedTheorySchedules.data)
      setPracticeSchedules(fetchedPracticeSchedules.data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])

  return (
    <>
      <h1>Thời Khóa Biểu Hiện Tại</h1>
      <hr />
      {theorySchedules && (
        <MaterialTable
          options={{
            exportButton: { csv: true, pdf: false },
          }}
          title="Lý Thuyết"
          icons={icons}
          columns={columns}
          localization={localization}
          data={theorySchedules}
        />
      )}
      <hr />
      {practiceSchedules && (
        <MaterialTable
          options={{
            exportButton: { csv: true, pdf: false },
          }}
          title="Thực Hành"
          icons={icons}
          columns={columns}
          localization={localization}
          data={practiceSchedules}
        />
      )}
      <br />
    </>
  )
}

export default StudentSchedule
