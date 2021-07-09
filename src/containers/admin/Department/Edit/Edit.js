import { useEffect, useState, useRef } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function SemesterUpdate() {
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
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
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
      />
      <div className="form-group form-check">
        <input
          key={chosenDepartment.id}
          type="checkbox"
          className="form-check-input"
          id="changedGeneralCheck"
          ref={changedGeneralCheckRef}
          defaultChecked={chosenDepartment.isGeneral}
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
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          data: {
            name: changedNameRef.current.value,
            isGeneral: changedGeneralCheckRef.current.checked,
          },
        })
        alert("Cập Nhật Thành Công")
        window.location.reload()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        alert("Cập Nhật Thất Bại")
        window.location.reload()
      }
    }
  }
  return (
    <div>
      <h1>Sửa Khoa</h1>
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
        <button type="submit" className="btn btn-primary">
          Cập Nhật
        </button>
      </form>
    </div>
  )
}

export default SemesterUpdate
