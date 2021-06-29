function AddStudent() {
  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">Thêm Sinh Viên</h1>
      <form name="addStudent" method="post">
        <div className="form-group">
          <label htmlFor="usernameInput">
            Mã Số Sinh Viên
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              autoComplete="off"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">
            Mật Khẩu
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              autoComplete="off"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="repasswordInput">
            Nhập Lại Mật Khẩu
            <input
              type="password"
              className="form-control"
              id="repasswordInput"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="firstNameInput">
            Họ
            <input type="text" className="form-control" id="firstNameInput" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="lastNameInput">
            Tên
            <input type="text" className="form-control" id="lastNameInput" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="birthInput">
            Ngày Sinh
            <input
              className="form-control"
              type="date"
              value="2011-08-19"
              id="birthInput"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="placeInput">
            Thường Trú
            <input type="text" className="form-control" id="placeInput" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumberInput">
            Số Điện Thoại
            <input type="text" className="form-control" id="phoneNumberInput" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="sessionInput">
            Niên Khoá
            <select
              className="form-control"
              id="sessionInput"
              onChange="onSessionChange()"
            >
              <option value="1">1</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="classInput">
            Thuộc Lớp Cơ Bản:
            <div>
              <select className="form-control" id="classInput">
                <option value="1">1</option>
              </select>
            </div>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="classInput">
            Giới Tính:
            <select className="form-control" id="genderInput">
              <option value="false">Nam</option>
              <option value="true">Nữ</option>
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </>
  )
}

export default AddStudent
