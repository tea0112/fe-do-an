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
import isoToYYYYMMdd from "../../../../helpers/isoToYYYYMMdd"
import validateLastName from "../../../../helpers/validations/validateLastName"
import validatePhoneNumber from "../../../../helpers/validations/validatePhoneNumber"
import validateFirstName from "../../../../helpers/validations/validateFirstName"

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
              gender: newData.gender === "true",
              birth:
                typeof newData.birth === "string"
                  ? newData.birth
                  : isoToYYYYMMdd(newData.birth),
            }
            const violations = [
              validateFirstName(refactoredNewData.firstName),
              validateLastName(refactoredNewData.lastName),
              validatePhoneNumber(refactoredNewData.phoneNumber),
            ]
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
                url: `/api/students/${refactoredNewData.id}`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  lastName: refactoredNewData.lastName,
                  firstName: refactoredNewData.firstName,
                  birth: refactoredNewData.birth,
                  place: refactoredNewData.place,
                  phoneNumber: refactoredNewData.phoneNumber,
                  gender: refactoredNewData.gender,
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
