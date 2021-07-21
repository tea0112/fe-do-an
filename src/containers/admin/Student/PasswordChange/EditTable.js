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
import { memo } from "react"
import MaterialTable from "material-table"
import _ from "lodash"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import validatePassword from "../../../../helpers/validations/validatePassword"

function Editable(props) {
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
  // must use with static because state cause memory leak
  const staticColumns = [
    {
      title: "Mật Khẩu Mới",
      field: "password",
    },
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
      exportTitle: "Xuất",
    },
    pagination: {
      labelRowsSelect: "Dòng",
      labelDisplayedRows: "{from}-{to} của {count}",
    },
    body: {
      emptyDataSourceMessage: "Không Tồn Tại Bản Ghi Nào",
    },
  }

  const title = props.currentClass
    ? `Danh Sách Sinh Viên Lớp ${props.currentClass.name} - Khoá ${props.currentClass.session.name}`
    : "Không Tồn Tại Lớp"
  const authRequest = useAuthRequest()
  return (
    <MaterialTable
      options={{
        exportButton: { csv: true, pdf: false },
      }}
      icons={icons}
      title={title}
      columns={staticColumns}
      data={props.students}
      localization={localization}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            const refactoredNewData = {
              ...newData,
            }
            const violations = [validatePassword(refactoredNewData.password)]
            const errors = violations.reduce(
              (acc, crv) =>
                !crv.isValid ? `${acc} ${crv.errorMessage}\n` : acc,
              ""
            )
            if (errors.length > 0) {
              window.alert(errors)
              reject()
            } else {
              authRequest({
                method: "PATCH",
                url: `/api/students/passwordChange`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  studentId: refactoredNewData.id,
                  password: refactoredNewData.password,
                },
              })
                .then((updatedStudent) => {
                  window.alert("Cập Nhật Thành Công")
                  // eslint-disable-next-line no-console
                  console.log(updatedStudent)
                  const dataUpdate = [...props.students]
                  const index = oldData.tableData.id
                  dataUpdate[index] = {
                    ...refactoredNewData,
                  }
                  props.setStudents([...dataUpdate])
                  resolve()
                })
                .catch((error) => {
                  window.alert("Cập Nhật Thất Bại")
                  // eslint-disable-next-line no-console
                  console.log(error)
                  reject()
                })
            }
          }),
      }}
    />
  )
}

function propsAreEqual(prv, nxt) {
  return _.isEqual(prv.students, nxt.students)
}

export default memo(Editable, propsAreEqual)
