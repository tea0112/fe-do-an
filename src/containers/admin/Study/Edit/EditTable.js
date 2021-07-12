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
import validateGrade from "../../../../helpers/validations/validateGrade"

function Editable({ studies, setStudies }) {
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
    {
      title: "Điểm Thi",
      field: "grade",
    },
    {
      title: "Môn",
      field: "subject.name",
      editable: "never",
    },
    {
      title: "Học Kỳ",
      field: "semester.termNumber",
      editable: "never",
    },
    {
      title: "Mã số sinh viên",
      field: "student.user.username",
      editable: "never",
    },
    {
      title: "Họ",
      field: "student.firstName",
      editable: "never",
    },
    { title: "Tên", field: "student.lastName", editable: "never" },
    {
      title: "Ngày Sinh",
      field: "student.birth",
      type: "date",
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
    },
  }

  const title = `Danh Sách Sinh Viên`
  const authRequest = useAuthRequest()
  return (
    <MaterialTable
      icons={icons}
      title={title}
      columns={staticColumns}
      data={studies}
      localization={localization}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            const refactoredNewData = {
              ...newData,
            }
            const violations = [validateGrade(refactoredNewData.grade)]
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
                url: `/api/admin/studies/${refactoredNewData.id}`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  grade: refactoredNewData.grade,
                },
              })
                .then((updatedStudent) => {
                  window.alert("Cập Nhật Thành Công")
                  // eslint-disable-next-line no-console
                  console.log(updatedStudent)
                  const dataUpdate = [...studies]
                  const index = oldData.tableData.id
                  dataUpdate[index] = {
                    ...refactoredNewData,
                  }
                  setStudies([...dataUpdate])
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
  return _.isEqual(prv.studies, nxt.studies)
}

export default memo(Editable, propsAreEqual)
