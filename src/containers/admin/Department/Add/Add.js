import { useRef } from "react"
import useAuthRequest from "../../../../helpers/useAuthRequest"

function DepartmentAdd() {
  const generalCheckRef = useRef(null)
  const nameRef = useRef(null)
  const authRequest = useAuthRequest()

  // submit
  const onSubmit = async (e) => {
    e.preventDefault()
    if (generalCheckRef) {
      if (generalCheckRef.current.value !== "") {
        try {
          await authRequest.post(`/api/admin/departments`, {
            name: nameRef.current.value,
            isGeneral: generalCheckRef.current.checked,
          })
          alert("Thêm Khoa thành công")
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err)
          alert("Thêm Khoa thất bại")
        }
      }
    }
  }
  return (
    <div>
      <h1>Thêm Khoa</h1>
      <i>
        Lưu ý chỉ có duy nhất một khoa cơ bản trong học kỳ đầu tiên quản lý các
        môn nền tảng.
      </i>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          Nhập Tên Khoa
          <input type="text" className="form-control" id="name" ref={nameRef} />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="generalCheck"
            ref={generalCheckRef}
          />
          Là Khoa Cơ Bản
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </div>
  )
}

export default DepartmentAdd
