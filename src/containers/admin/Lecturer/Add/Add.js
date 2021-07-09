import { useEffect, useState, useRef } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function LecturerAdd() {
  // -state
  const [departments, setDepartments] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // -ref
  const departmentInputRef = useRef()
  const lecturerNameInputRef = useRef()
  const authRequest = useAuthRequest()
  // -fetch
  const getDepartment = () => authRequest.get("/api/departments")
  // -effect
  useEffect(() => {
    getDepartment()
      .then((departmentsData) => {
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
    setIsLoading(true)
    authRequest({
      method: "POST",
      url: `/api/admin/lecturers`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: lecturerNameInputRef.current.value,
        departmentId: departmentInputRef.current.value,
      },
    })
      .then(() => {
        setIsLoading(false)
        alert("Cập Nhật Thành Công")
      })
      .catch((err) => {
        setIsLoading(false)
        alert(`Cập Nhật Thất Bại, Không Được Trùng Tên Hoặc Rỗng`)
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }
  // -change
  return (
    <div>
      <h1>Thêm Giảng Viên</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          Khoa
          <select
            className="form-control"
            id="departmentInput"
            ref={departmentInputRef}
          >
            {departments && departmentOption(departments)}
          </select>
        </div>
        <div className="form-group">
          Tên Giảng Viên
          <input
            type="text"
            id="lecturerNameInput"
            ref={lecturerNameInputRef}
            className="form-control"
          />
        </div>
        <button disabled={isLoading} type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </div>
  )
}

export default LecturerAdd
