import { useRef, useEffect, useState } from "react"
import $ from "jquery"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function SemesterDelete() {
  // state
  const [departments, setDepartments] = useState(null)
  const [choseDepartment, setChoseDepartment] = useState(null)
  const authRequest = useAuthRequest()

  // ref
  const departmentNameSelectRef = useRef(null)
  const changedNameRef = useRef(null)
  const changedGeneralCheckRef = useRef(null)

  // effect
  useEffect(async () => {
    try {
      const response = await authRequest.get("/api/departments")
      setDepartments(response.data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])
  useEffect(() => {
    if (departments) {
      setChoseDepartment(
        departments.find(
          (d) => d.id === parseInt(departmentNameSelectRef.current.value, 10)
        )
      )
    }
  }, [departments])

  // change
  const changingDepartmentNameSelect = () => {
    if (departments) {
      setChoseDepartment(
        departments.find(
          (d) => d.id === parseInt(departmentNameSelectRef.current.value, 10)
        )
      )
    }
  }

  // component
  const departmentOptions = (departmentsData) =>
    departmentsData.map((e) => (
      <option value={e.id} key={e.id}>
        {e.name}
      </option>
    ))
  const choseDepartmentFormChanging = (chosenDepartment) => (
    <div>
      ID
      <input
        className="form-control"
        type="text"
        value={chosenDepartment.id}
        disabled
      />
      Tên Khoa
      <input
        type="text"
        className="form-control"
        key={chosenDepartment.id}
        ref={changedNameRef}
        defaultValue={chosenDepartment.name}
        disabled
      />
      <div className="form-group form-check">
        <input
          key={chosenDepartment.id}
          type="checkbox"
          className="form-check-input"
          id="changedGeneralCheck"
          ref={changedGeneralCheckRef}
          defaultChecked={choseDepartment.isGeneral}
          disabled
        />
        Là Khoa Cơ Bản
      </div>
    </div>
  )

  // submit
  const onSubmit = async (e) => {
    e.preventDefault()
    if (choseDepartment) {
      try {
        await authRequest({
          url: `/api/admin/departments/${choseDepartment.id}`,
          method: "DELETE",
        })
        alert("Xoá Thành Công")
        window.location.reload()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        alert("Xoá Thất Bại")
        window.location.reload()
      }
    }
  }
  const preDeleteClick = () => {
    $("#deleteModal").modal()
  }
  return (
    <div>
      <h1>Xoá Khoa</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <select
            ref={departmentNameSelectRef}
            className="form-control"
            id="departmentNameSelect"
            onChange={changingDepartmentNameSelect}
          >
            {departments && departmentOptions(departments)}
          </select>
        </div>
        {choseDepartment && choseDepartmentFormChanging(choseDepartment)}
        <button
          className="btn btn-primary"
          type="button"
          onClick={preDeleteClick}
        >
          Xoá
        </button>
        {/* modal */}
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
                  Bạn chắc chắn muốn xoá khoa{" "}
                  {choseDepartment && <b>{choseDepartment.name}</b>}:
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
                {choseDepartment && (
                  <span>
                    {choseDepartment.id} - {choseDepartment.name}
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
      </form>
    </div>
  )
}

export default SemesterDelete
