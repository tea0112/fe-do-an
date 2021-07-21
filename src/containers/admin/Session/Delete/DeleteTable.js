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

function Editable({ sessions, setSessions }) {
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
      exportTitle: "Xuất",
    },
    pagination: {
      labelRowsSelect: "Dòng",
      labelDisplayedRows: "{from}-{to} trang {count}",
    },
    body: {
      emptyDataSourceMessage: "Không Tồn Tại Bản Ghi Nào",
      editRow: {
        deleteText: `Bạn có muốn xoá niên khoá này?`,
      },
    },
  }

  const title = `Danh Sách Tất Cả Các Niên Khoá`
  const authRequest = useAuthRequest()
  return (
    <MaterialTable
      options={{
        exportButton: { csv: true, pdf: false },
      }}
      icons={icons}
      title={title}
      columns={staticColumns}
      data={sessions}
      localization={localization}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            authRequest({
              method: "DELETE",
              url: `/api/admin/sessions/${oldData.id}`,
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                window.alert(`Xoá niên khoá "${oldData.name}" Thành Công`)
                // eslint-disable-next-line no-console
                const dataDelete = [...sessions]
                const index = oldData.tableData.id
                dataDelete.splice(index, 1)
                setSessions([...dataDelete])
                resolve()
              })
              .catch((error) => {
                window.alert(`Xoá Niên Khoá ${oldData.name} Thất Bại`)
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
  return _.isEqual(prv.sessions, nxt.sessions)
}

export default memo(Editable, propsAreEqual)
