import { useEffect, useState } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function SubjectAdd() {
  // -state
  const [departments, setDepartments] = useState(null)
  const [subjectType, setSubjectType] = useState(0)
  const [departmentInput, setDepartmentInput] = useState("")
  const [subjectNameInput, setSubjectNameInput] = useState("")
  const authRequest = useAuthRequest()

  // -fetch
  const getDepartment = () => authRequest.get("/api/departments")

  // -effect
  useEffect(() => {
    getDepartment()
      .then((departmentsData) => {
        if (departmentsData.data.length > 0) {
          setDepartmentInput(departmentsData.data[0].id)
        }
        setDepartments(departmentsData.data)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }, [])

  // -component
  const departmentOption = (departmentData) =>
    departmentData.map((department) => (
      <option key={department.id} value={department.id}>
        {department.name}
      </option>
    ))
  // -submit
  const onSubmit = (e) => {
    e.preventDefault()
    authRequest({
      method: "POST",
      url: `/admin/subjects`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: subjectNameInput.toLowerCase(),
        subjectType,
        departmentId: departmentInput,
      },
    })
      .then(() => {
        alert("Thêm Thành Công")
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        alert("Thêm Thất Bại, Tên Môn Không Được Trùng Hoặc Rỗng")
      })
  }
  // -change
  const onSubjectTypeChange = (e) => {
    setSubjectType(e.target.value)
  }
  const onDepartmentChange = (e) => {
    setDepartmentInput(e.target.value)
  }
  const onSubjectNameChange = (e) => {
    setSubjectNameInput(e.target.value)
  }
  return (
    <div>
      <h1>Thêm Môn</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          Khoa
          <select
            className="form-control"
            id="departmentInput"
            onChange={onDepartmentChange}
            value={departmentInput}
          >
            {departments && departmentOption(departments)}
          </select>
        </div>
        <div className="form-group">
          Tên Môn
          <input
            type="text"
            id="subjectNameInput"
            value={subjectNameInput}
            onChange={onSubjectNameChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          Kiểu Môn
          <select
            className="form-control"
            value={subjectType}
            id="subjectTypeInput"
            onChange={onSubjectTypeChange}
          >
            <option value="0">lý thuyết</option>
            <option value="1">thực hành</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </div>
  )
}

export default SubjectAdd
