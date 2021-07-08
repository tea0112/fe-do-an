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

function DeleteTable({ schedules, setSchedules }) {
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
      labelDisplayedRows: "{from}-{to} trang {count}",
    },
    body: {
      emptyDataSourceMessage: "Không Tồn Tại Bản Ghi Nào",
      editRow: {
        deleteText: `Bạn có muốn xoá thời khoá biểu này?`,
      },
    },
  }

  const title = `Danh Sách Tất Cả Thời Khoá Biểu`
  const authRequest = useAuthRequest()
  return (
    <MaterialTable
      icons={icons}
      title={title}
      columns={staticColumns}
      data={schedules}
      localization={localization}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            authRequest({
              method: "DELETE",
              url: `/api/admin/schedules/${oldData.id}`,
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                window.alert(`Xoá Thời Khoá Biểu Thành Công`)
                // eslint-disable-next-line no-console
                const dataDelete = [...schedules]
                const index = oldData.tableData.id
                dataDelete.splice(index, 1)
                setSchedules((prevSchedule) => ({
                  ...prevSchedule,
                  schedules: dataDelete,
                }))
                resolve()
              })
              .catch((error) => {
                window.alert(`Xoá Thời Khoá Biểu ${oldData.name} Thất Bại`)
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
  return _.isEqual(prv.schedules, nxt.schedules)
}

export default memo(DeleteTable, propsAreEqual)
