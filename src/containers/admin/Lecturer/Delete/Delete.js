import { useEffect, useState } from "react"
import $ from "jquery"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function SubjectEdit() {
  const [lecturer, setLecturer] = useState(null)
  const [lecturers, setLecturers] = useState(null)
  const [departments, setDepartments] = useState(null)
  const [departmentUpdateInput, setDepartmentUpdateInput] = useState(null)

  const authRequest = useAuthRequest()

  const getDepartment = () => authRequest.get("/api/departments")
  const getLecturers = (departmentId) =>
    authRequest.get(`/api/admin/lecturers?departmentId=${departmentId}`)
  const getLecturer = (id) => authRequest.get(`/api/admin/lecturers/${id}`)

  useEffect(async () => {
    const response = await getDepartment()
    setDepartments(response.data)
    if (response.data) {
      if (response.data.length > 0) {
        setDepartmentUpdateInput(response.data[0].id)
      }
    }
  }, [])

  useEffect(async () => {
    if (departmentUpdateInput) {
      const response = await getLecturers(departmentUpdateInput)
      setLecturers(response.data)
    }
  }, [departmentUpdateInput])

  useEffect(async () => {
    if (lecturers) {
      if (lecturers.length > 0) {
        const response = await getLecturer(lecturers[0].id)
        setLecturer(response.data)
      }
    }
  }, [lecturers])

  useEffect(async () => {
    const response = await getLecturers(departmentUpdateInput)
    setLecturers(response.data)
  }, [departmentUpdateInput])

  const departmentInputChange = async (e) => {
    setDepartmentUpdateInput(e.target.value)
  }

  const lecturerInputChange = (e) => {
    lecturers.forEach((elm) => {
      if (elm.id === parseInt(e.target.value, 10)) {
        setLecturer(elm)
      }
    })
  }

  const onUpdate = (e) => {
    e.preventDefault()
    authRequest({
      method: "DELETE",
      url: `/api/admin/lecturers/${lecturer.id}`,
    })
      .then(() => {
        alert("Xoá Thành Công")
        window.location.reload()
      })
      .catch((err) => {
        alert(`Xoá Thất Bại ${err}`)
        window.location.reload()
      })
  }
  const preDeleteClick = () => {
    $("#deleteModal").modal()
  }

  const departmentOption = (departmentData) =>
    departmentData.map((department) => (
      <option key={department.id} value={department.id}>
        {department.name}
      </option>
    ))
  const lecturersOption = (lecturerData) =>
    lecturerData.map((lec) => (
      <option key={lec.id} value={lec.id}>
        {lec.name}
      </option>
    ))
  return (
    <div>
      <h1>Xoá Giảng Viên</h1>
      <form>
        <div className="form-group">
          Khoa
          <select
            className="form-control"
            id="departmentInput"
            onChange={departmentInputChange}
          >
            {departments && departmentOption(departments)}
          </select>
        </div>
        <div className="form-group">
          Tên Giảng Viên
          <select
            className="form-control"
            onChange={lecturerInputChange}
            id="lecturerInput"
            value={lecturer && lecturer.id}
          >
            {lecturers && lecturersOption(lecturers)}
          </select>
        </div>
      </form>
      <hr />
      <div>
        {lecturers && lecturers.length > 0 && (
          <div>
            <i>Id hiện tại</i>
            <input
              type="text"
              className="form-control"
              disabled
              value={lecturer && lecturer.id}
            />
            <i>Tên hiện tại</i>
            <input
              type="text"
              className="form-control"
              disabled
              value={lecturer && lecturer.name}
            />
            <i>Khoa hiện tại</i>
            <input
              type="text"
              className="form-control"
              disabled
              value={
                lecturer && lecturer.department && lecturer.department.name
              }
            />
          </div>
        )}
        <hr />
        <form onSubmit={onUpdate}>
          <button
            type="button"
            onClick={preDeleteClick}
            className="btn btn-primary"
          >
            Xoá
          </button>
          {/* start modal */}
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Bạn chắc chắn muốn xoá giảng viên{" "}
                    {lecturer && <b>{lecturer.name}</b>}:
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {lecturer && (
                    <span>
                      {lecturer.id} - {lecturer.name}
                    </span>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* end modal */}
        </form>
      </div>
    </div>
  )
}

export default SubjectEdit
