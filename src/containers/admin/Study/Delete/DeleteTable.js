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
      labelDisplayedRows: "{from}-{to} trang {count}",
    },
    body: {
      emptyDataSourceMessage: "Không Tồn Tại Bản Ghi Nào",
      editRow: {
        deleteText: `Bạn có muốn xoá điểm này?`,
      },
    },
  }

  const title = `Danh Sách Điểm Sinh Viên`
  const authRequest = useAuthRequest()
  return (
    <MaterialTable
      icons={icons}
      title={title}
      columns={staticColumns}
      data={studies}
      localization={localization}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            authRequest({
              url: `/api/admin/studies/${oldData.id}`,
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                window.alert("Xoá Điểm Thành Công")
                const dataDelete = [...studies]
                const index = oldData.tableData.id
                dataDelete.splice(index, 1)
                setStudies(dataDelete)
                resolve()
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err)
                window.alert(`Xoá Điểm Thất Bại`)
                reject()
              })
          }),
      }}
    />
  )
}

function propsAreEqual(prv, nxt) {
  return _.isEqual(prv.studies, nxt.studies)
}

export default memo(Editable, propsAreEqual)
