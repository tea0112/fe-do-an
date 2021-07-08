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
  LastPage,
  NavigateBefore,
  NavigateNext,
  Replay,
  Search,
} from "@material-ui/icons"
import { memo } from "react"
import MaterialTable from "material-table"

// import _ from "lodash"

function Editable(props) {
  const icons = {
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

  // must use with static because state cause memory leak
  const staticColumns = [
    { title: "Môn", field: "subject.name", editable: "never" },
    {
      title: "Loại Môn",
      field: "subject.subjectType",
      lookup: {
        0: "Lý Thuyết",
        1: "Thực Hành",
      },
      editable: "never",
    },
    { title: "Giảng Viên", field: "lecturer.name", editable: "never" },
    { title: "Thứ", field: "weekDay", editable: "never" },
    { title: "Tiết Bắt Đầu", field: "startPeriod", editable: "never" },
    { title: "Tiết Kết Thúc", field: "endPeriod", editable: "never" },
    {
      title: "Buổi",
      field: "periodType",
      lookup: {
        0: "Sáng",
        1: "Chiều",
        2: "Tối",
      },
      editable: "never",
    },
  ]
  const localization = {
    header: {
      actions: "",
    },
    toolbar: {
      searchPlaceholder: "Tìm Kiếm",
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
  const title = `Danh Sách Thời Khoá Biểu`
  const { schedules } = props
  return (
    <MaterialTable
      icons={icons}
      title={title}
      columns={staticColumns}
      data={schedules}
      localization={localization}
      editable={{
        onRowUpdate: (newData) =>
          // eslint-disable-next-line no-unused-vars
          new Promise((resolve, reject) => {
            window.open(`/admin/thoi-khoa-bieu/sua/${newData.id}`)
            resolve()
          }),
      }}
    />
  )
}

function propsAreEqual(prv, nxt) {
  return _.isEqual(prv.schedules, nxt.schedules)
}

export default memo(Editable, propsAreEqual)
