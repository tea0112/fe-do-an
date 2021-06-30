import useStateWithLabel from "../../../../helpers/useStateWithLabel"

function AddStudent() {
  const [studentNumber, setStudentNumber] = useStateWithLabel(
    "",
    "studentNumber"
  )
  const [password, setPassword] = useStateWithLabel("", "password")
  const [reTypePassword, setReTypePassword] = useStateWithLabel(
    "",
    "reTypePassword"
  )
  const [firstName, setFirstName] = useStateWithLabel("", "firstName")
  const [lastName, setLastName] = useStateWithLabel("", "lastName")
  const [birth, setBirth] = useStateWithLabel("1971-11-03", "birth")
  const [place, setPlace] = useStateWithLabel("", "place")
  const [phoneNumber, setPhoneNumber] = useStateWithLabel("", "phoneNumber")
  const [session, setSession] = useStateWithLabel("", "session")
  const [clazz, setClass] = useStateWithLabel("", "clazz")
  const [gender, setGender] = useStateWithLabel("", "gender")

  const onStudentNumberChange = (e) => {
    setStudentNumber(e.target.value)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const onReTypePasswordChange = (e) => {
    setReTypePassword(e.target.value)
  }
  const onFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const onLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  const onBirthChange = (e) => {
    setBirth(e.target.value)
  }
  const onPlaceChange = (e) => {
    setPlace(e.target.value)
  }
  const onPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value)
  }
  const onSessionChange = (e) => {
    setSession(e.target.value)
  }
  const onClazzChange = (e) => {
    setClass(e.target.value)
  }
  const onGenderChange = (e) => {
    setGender(e.target.value)
  }

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">Thêm Sinh Viên</h1>
      <form name="addStudent" method="post">
        <div className="form-group">
          Mã Số Sinh Viên
          <input
            value={studentNumber}
            onChange={onStudentNumberChange}
            type="text"
            className="form-control"
            id="usernameInput"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          Mật Khẩu
          <input
            value={password}
            onChange={onPasswordChange}
            type="password"
            className="form-control"
            id="passwordInput"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          Nhập Lại Mật Khẩu
          <input
            value={reTypePassword}
            onChange={onReTypePasswordChange}
            type="password"
            className="form-control"
            id="repasswordInput"
          />
        </div>
        <div className="form-group">
          Họ
          <input
            value={firstName}
            onChange={onFirstNameChange}
            type="text"
            className="form-control"
            id="firstNameInput"
          />
        </div>
        <div className="form-group">
          Tên
          <input
            value={lastName}
            onChange={onLastNameChange}
            type="text"
            className="form-control"
            id="lastNameInput"
          />
        </div>
        <div className="form-group">
          Ngày Sinh
          <input
            value={birth}
            onChange={onBirthChange}
            className="form-control"
            type="date"
            id="birthInput"
          />
        </div>
        <div className="form-group">
          Thường Trú
          <input
            value={place}
            onChange={onPlaceChange}
            type="text"
            className="form-control"
            id="placeInput"
          />
        </div>
        <div className="form-group">
          Số Điện Thoại
          <input
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            type="text"
            className="form-control"
            id="phoneNumberInput"
          />
        </div>
        <div className="form-group">
          Niên Khoá
          <select
            value={session}
            onChange={onSessionChange}
            className="form-control"
            id="sessionInput"
          >
            <option value="1">1</option>
          </select>
        </div>
        <div className="form-group">
          Thuộc Lớp Cơ Bản:
          <div>
            <select
              value={clazz}
              onChange={onClazzChange}
              className="form-control"
              id="classInput"
            >
              <option value="1">1</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          Giới Tính:
          <select
            value={gender}
            onChange={onGenderChange}
            className="form-control"
            id="genderInput"
          >
            <option value="false">Nam</option>
            <option value="true">Nữ</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </>
  )
}

export default AddStudent
