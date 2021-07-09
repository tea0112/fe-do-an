import { useEffect, useRef, useState } from "react"
import $ from "jquery"
import useAuthRequest from "../../../../helpers/useAuthRequest"
import deepFreeze from "../../../../helpers/deepFreeze"

function SubjectEdit() {
  const [state, setState] = useState({
    departments: null,
    lecturers: null,
    lecturer: null,
    departmentUpdateInput: null,
  })
  const authRequest = useAuthRequest()

  const departmentInputRef = useRef()
  const lecturerInputRef = useRef()

  // get
  const getDepartment = () => authRequest.get("/api/departments")
  const getLecturers = (departmentId) =>
    authRequest.get(`/api/admin/lecturers?departmentId=${departmentId}`)
  const getLecturer = (id) => authRequest.get(`/api/admin/lecturers/${id}`)

  // effect
  useEffect(() => {
    getDepartment()
      .then((departments) => {
        setState((preState) =>
          deepFreeze({
            ...preState,
            departments: deepFreeze(departments.data),
            departmentUpdateInput: departmentInputRef.current.value,
          })
        )
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    if (state.departments) {
      getLecturers(departmentInputRef.current.value)
        .then((lecturers) => {
          setState((prevState) =>
            deepFreeze({
              ...prevState,
              lecturers: deepFreeze(lecturers.data),
            })
          )
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    }
  }, [state.departments])
  useEffect(() => {
    if (state.lecturers) {
      getLecturer(lecturerInputRef.current.value)
        .then((lecturer) => {
          setState((prevState) =>
            deepFreeze({
              ...prevState,
              lecturer: deepFreeze(lecturer.data),
            })
          )
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    }
  }, [state.lecturers])

  // change
  const departmentInputChange = () => {
    setState((prevState) =>
      deepFreeze({
        ...prevState,
        departmentUpdateInput: departmentInputRef.current.value,
      })
    )
    getLecturers(departmentInputRef.current.value)
      .then((lecturers) => {
        setState((prevState) =>
          deepFreeze({
            ...prevState,
            lecturers,
          })
        )
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }
  const lecturerInputChange = () => {
    getLecturer(lecturerInputRef.current.value)
      .then((lecturer) => {
        setState((prevState) =>
          deepFreeze({
            ...prevState,
            lecturer,
          })
        )
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }

  // submit
  const onUpdate = (e) => {
    e.preventDefault()
    authRequest({
      method: "DELETE",
      url: `/api/admin/lecturers/${state.lecturer.id}`,
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
    lecturerData.map((lecturer) => (
      <option key={lecturer.id} value={lecturer.id}>
        {lecturer.name}
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
            ref={departmentInputRef}
            onChange={departmentInputChange}
          >
            {state.departments && departmentOption(state.departments)}
          </select>
        </div>
        <div className="form-group">
          Tên Giảng Viên
          <select
            className="form-control"
            ref={lecturerInputRef}
            onChange={lecturerInputChange}
            id="lecturerInput"
          >
            {state.lecturers && lecturersOption(state.lecturers)}
          </select>
        </div>
      </form>
      <hr />
      <div>
        {state.lecturers && state.lecturers.length > 0 && (
          <div>
            <i>Id hiện tại</i>
            <input
              type="text"
              className="form-control"
              disabled
              value={state.lecturer && state.lecturer.id}
            />
            <i>Tên hiện tại</i>
            <input
              type="text"
              className="form-control"
              disabled
              value={state.lecturer && state.lecturer.name}
            />
            <i>Khoa hiện tại</i>
            <input
              type="text"
              className="form-control"
              disabled
              value={
                state.lecturer &&
                state.lecturer.department &&
                state.lecturer.department.name
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
                    {state.lecturer && <b>{state.lecturer.name}</b>}:
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
                  {state.lecturer && (
                    <span>
                      {state.lecturer.id} - {state.lecturer.name}
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
