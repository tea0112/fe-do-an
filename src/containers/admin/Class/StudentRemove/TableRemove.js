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
import useAuthRequest from "../../../../helpers/useAuthRequest"

function DeleteTable(props) {
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
    },
    { title: "Tên", field: "lastName" },
    { title: "Ngày Sinh", field: "birth", type: "date" },
    { title: "Nơi Sinh", field: "place" },
    { title: "Số Điện Thoại", field: "phoneNumber" },
    {
      title: "Giới Tính",
      field: "gender",
      lookup: { false: "Nam", true: "Nữ" },
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
      labelDisplayedRows: "{from}-{to} trang {count}",
    },
    body: {
      emptyDataSourceMessage: "Không Tồn Tại Bản Ghi Nào",
      editRow: {
        deleteText: `Bạn có muốn xoá sinh viên này khỏi lớp ${props.currentClass.name}?`,
      },
    },
  }

  const title = props.currentClass
    ? `Danh Sách Sinh Viên Lớp ${props.currentClass.name} - Khoá ${props.currentClass.session.name}`
    : "Không Tồn Tại Lớp"
  const authRequest = useAuthRequest()
  return (
    <MaterialTable
      icons={icons}
      title={title}
      columns={staticColumns}
      data={props.students}
      localization={localization}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            authRequest({
              method: "DELETE",
              url: `/api/admin/studentClass?studentId=${oldData.id}&classId=${props.currentClass.id}`,
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                window.alert(
                  `Xoá Thành Công Sinh Viên "${oldData.firstName} ${oldData.lastName}" Khỏi Lớp "${props.currentClass.name}"`
                )
                const dataDelete = [...props.students]
                const index = oldData.tableData.id
                dataDelete.splice(index, 1)
                props.setStudents([...dataDelete])
                resolve()
              })
              .catch((error) => {
                window.alert(
                  `Xoá Sinh Viên ${oldData.firstName} ${oldData.lastName} Khỏi Lớp ${props.currentClass.name} Thất Bại`
                )
                // eslint-disable-next-line no-console
                console.log(error)
                reject()
              })
          }),
      }}
    />
  )
}

function propsAreEqual(prv, nxt) {
  return _.isEqual(prv.students, nxt.students)
}

export default memo(DeleteTable, propsAreEqual)
