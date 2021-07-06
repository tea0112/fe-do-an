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
  Save,
  Search,
} from "@material-ui/icons"
import { memo } from "react"
import MaterialTable from "material-table"
import _ from "lodash"
import useAuthRequest from "../../../../helpers/useAuthRequest"

// eslint-disable-next-line no-unused-vars
function Editable({ data, classes }) {
  const classesLookup = classes.reduce(
    (acc, crv) => ({ ...acc, [crv.id]: crv.name }),
    {}
  )
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
    Save,
  }
  // must use with static because state cause memory leak
  const staticColumns = [
    {
      title: "Thuộc Lớp",
      field: "chosenClass",
      lookup: classesLookup,
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
      editable: "never",
      lookup: {
        false: "Nam",
        true: "Nữ",
      },
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

  const title = `Danh Sách Sinh Viên Khoá`
  // eslint-disable-next-line no-unused-vars
  const authRequest = useAuthRequest()
  return (
    <MaterialTable
      icons={icons}
      title={title}
      columns={staticColumns}
      data={data}
      localization={localization}
      editable={{
        onRowUpdate: (newData, oldData) =>
          // eslint-disable-next-line no-unused-vars
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data]
              const index = oldData.tableData.id
              dataUpdate[index] = newData
              const { chosenClass } = dataUpdate[index]
              authRequest({
                method: "POST",
                url: `/api/admin/studentClass`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  studentId: dataUpdate[index].id,
                  classId: chosenClass,
                },
              })
                .then(() => {
                  resolve()
                  alert(
                    `Thêm sinh viên "${dataUpdate[index].firstName} ${dataUpdate[index].lastName}" vào lớp ` +
                      `"${classesLookup[chosenClass]}" thành công`
                  )
                  window.location.reload()
                })
                .catch((err) => {
                  // eslint-disable-next-line no-console
                  console.log(err)
                  alert(
                    `Thêm sinh viên "${dataUpdate[index].firstName} ${dataUpdate[index].lastName}" ` +
                      `vào lớp "${classesLookup[chosenClass]}" thất bại. Sinh viên chỉ thuộc tối đa ` +
                      `2 lớp là cơ bản và chuyên ngành`
                  )
                  reject()
                })
            }, 1000)
          }),
      }}
    />
  )
}

function propsAreEqual(prv, nxt) {
  return _.isEqual(prv, nxt)
}

export default memo(Editable, propsAreEqual)
