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
import useAuthRequest from "../../../../helpers/useAuthRequest"

// import _ from "lodash"

function Editable({ subjects, setSubjects, departments }) {
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
      exportTitle: "Xuất",
    },
    pagination: {
      labelRowsSelect: "Dòng",
      labelDisplayedRows: "{from}-{to} của {count}",
    },
    body: {
      emptyDataSourceMessage: "Không Tồn Tại Bản Ghi Nào",
      editTooltip: "Sửa",
      editRow: {
        cancelTooltip: "Huỷ bỏ",
        saveTooltip: "Tiếp tục",
      },
    },
  }
  const authRequest = useAuthRequest()
  const title = `Danh Sách Môn`
  return (
    <MaterialTable
      options={{
        exportButton: { csv: true, pdf: false },
      }}
      icons={icons}
      title={title}
      columns={staticColumns}
      data={subjects}
      localization={localization}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            authRequest({
              url: `/api/admin/subjects/${newData.id}`,
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                name: newData.name,
                subjectType: newData.subjectType,
                departmentId: newData.department.id,
              },
            })
              .then(() => {
                const dataUpdate = [...subjects]
                const index = oldData.tableData.id
                dataUpdate[index] = {
                  ...newData,
                }
                setSubjects((prevState) => ({ ...prevState, dataUpdate }))
                window.alert("Sửa Thành Công")
                resolve()
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err)
                window.alert("Sửa Thất Bại")
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
