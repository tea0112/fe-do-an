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
import _ from "lodash"

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
    { title: "Mã số sinh viên", field: "user.username", editable: "never" },
    {
      title: "Họ",
      field: "firstName",
      editable: "never",
    },
    { title: "Tên", field: "lastName", editable: "never" },
    { title: "Ngày Sinh", field: "birth", type: "date", editable: "never" },
    { title: "Nơi Sinh", field: "place", editable: "never" },
    { title: "Số Điện Thoại", field: "phoneNumber", editable: "never" },
    {
      title: "Giới Tính",
      field: "gender",
      lookup: { false: "Nam", true: "Nữ" },
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
      editTooltip: "Thêm Vào",
      editRow: {
        cancelTooltip: "Huỷ bỏ",
        saveTooltip: "Tiếp tục",
      },
    },
  }

  const title = props.currentClass
    ? `Danh Sách Sinh Viên Lớp ${props.currentClass.name} - Khoá ${props.currentClass.session.name}`
    : "Không Tồn Tại Lớp"
  return (
    <MaterialTable
      icons={icons}
      title={title}
      columns={staticColumns}
      data={props.students}
      localization={localization}
      editable={{
        onRowUpdate: (newData) =>
          new Promise((resolve) => {
            window.open(
              `/admin/diem-thi/them/${newData.id}?departmentId=${props.departmentInput}`
            )
            resolve()
          }),
      }}
    />
  )
}

function propsAreEqual(prv, nxt) {
  return _.isEqual(prv.students, nxt.students)
}

export default memo(Editable, propsAreEqual)
