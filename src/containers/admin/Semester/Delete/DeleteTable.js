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
import useAuthRequest from "../../../../helpers/useAuthRequest"

// import _ from "lodash"

function Editable({ subjects, setSubjects, departments }) {
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

  const departmentsLookup = departments.reduce(
    (acc, crv) => ({ ...acc, [`${crv.id}`]: crv.name }),
    {}
  )
  // must use with static because state cause memory leak
  const staticColumns = [
    { title: "Tên Môn", field: "name" },
    {
      title: "Kiểu Môn",
      field: "subjectType",
      lookup: {
        0: "Lý Thuyết",
        1: "Thực Hành",
      },
    },
    {
      title: "Thuộc Khoa",
      field: "department.id",
      lookup: departmentsLookup,
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
        deleteText: `Bạn có muốn xoá môn này?`,
      },
    },
  }
  const authRequest = useAuthRequest()
  const title = `Danh Sách Môn`
  return (
    <MaterialTable
      icons={icons}
      title={title}
      columns={staticColumns}
      data={subjects}
      localization={localization}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            authRequest({
              url: `/api/admin/subjects/${oldData.id}`,
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                window.alert("Xoá Môn Thành Công")
                const dataDelete = [...subjects]
                const index = oldData.tableData.id
                dataDelete.splice(index, 1)
                setSubjects((prevSchedule) => ({
                  ...prevSchedule,
                  subjects: dataDelete,
                }))
                resolve()
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err)
                window.alert(`Xoá Môn ${oldData.name} Thất Bại`)
                reject()
              })
          }),
      }}
    />
  )
}

function propsAreEqual(prv, nxt) {
  return _.isEqual(prv.subjects, nxt.subjects)
}

export default memo(Editable, propsAreEqual)
