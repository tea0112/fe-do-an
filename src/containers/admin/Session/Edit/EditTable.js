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
import validateSessionName from "../../../../helpers/validations/validateSessionName"

function Editable({ sessions, setSessions }) {
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
    { title: "Id", field: "id", editable: "never" },
    {
      title: "Tên Niên Khoá",
      field: "name",
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

  const title = `Danh Sách Tất Cả Các Niên Khoá`
  const authRequest = useAuthRequest()
  return (
    <MaterialTable
      icons={icons}
      title={title}
      columns={staticColumns}
      data={sessions}
      localization={localization}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            const refactoredNewData = {
              ...newData,
            }
            const violations = [validateSessionName(refactoredNewData.name)]
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
                url: `/api/admin/sessions/${refactoredNewData.id}`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  name: refactoredNewData.name,
                },
              })
                .then((updatedStudent) => {
                  window.alert(
                    `Cập Nhật "${oldData.name}" Thành "${updatedStudent.data.name}" Thành Công`
                  )
                  // eslint-disable-next-line no-console
                  console.log(updatedStudent)
                  const dataUpdate = [...sessions]
                  const index = oldData.tableData.id
                  dataUpdate[index] = {
                    ...refactoredNewData,
                  }
                  setSessions([...dataUpdate])
                  resolve()
                })
                .catch((error) => {
                  window.alert(`Cập Nhật ${oldData.name} Thất Bại`)
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
  return _.isEqual(prv.sessions, nxt.sessions)
}

export default memo(Editable, propsAreEqual)
