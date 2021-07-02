import useStateWithLabel from "../../../../helpers/useStateWithLabel"
import StudentNumber from "./StudentNumber"
import Password from "./Password"
import ReTypePassword from "./ReTypePassword"
import FirstName from "./FirstName"
import LastName from "./LastName"
import Birth from "./Birth"
import Place from "./Place"
import PhoneNumber from "./PhoneNumber"
import Session from "./Session"
import BasicClass from "./BasicClass"
import Gender from "./Gender"
import hasOwnProperty from "../../../../helpers/hasOwnPropperty"
// import axiosAuthRequest from "../../../../helpers/axiosAuthRequest"
import useRequest from "../../../../helpers/useRequest"

function AddStudent() {
  const [request] = useRequest()

  const [studentNumber, setStudentNumber] = useStateWithLabel(
    null,
    "studentNumber"
  )
  const [password, setPassword] = useStateWithLabel(null, "password")
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

  const states = [
    studentNumber,
    password,
    reTypePassword,
    firstName,
    lastName,
    birth,
    place,
    phoneNumber,
    session,
    clazz,
    gender,
  ]

  const onSubmit = async (e) => {
    e.preventDefault()
    for (const state of states) {
      if (hasOwnProperty(state, "isValid")) {
        if (!state.isValid || state.value === "" || state.value == null) {
          alert("Tồn tại lỗi nhập liệu")
          return null
        }
      }
    }
    const url = `/api/admin/student/add`
    const data = {
      username: studentNumber.value,
      password: password.value,
      repassword: reTypePassword.value,
      firstName: firstName.value,
      lastName: lastName.value,
      birth: birth.value,
      place: place.value,
      phoneNumber: phoneNumber.value,
      sessionId: parseInt(session.value, 10),
      classId: parseInt(clazz.value, 10),
      gender: parseInt(gender.value, 10),
    }
    try {
      const response = await request.post(url, data)
      // eslint-disable-next-line no-console
      console.log(response)
      alert("Thêm sinh viên thành công")
      window.location.reload()
    } catch (err) {
      alert("Thêm sinh viên thất bại")
      // eslint-disable-next-line no-console
      console.log(data, err)
      window.location.reload()
    }
    return null
  }

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">Thêm Sinh Viên</h1>
      <form name="addStudent" method="post" onSubmit={onSubmit}>
        <StudentNumber
          onStudentNumberChildChange={setStudentNumber}
          studentNumber={studentNumber}
        />
        <Password
          onPasswordChildChange={setPassword}
          studentNumber={password}
        />
        <ReTypePassword
          onReTypePasswordChildChange={setReTypePassword}
          password={password}
          reTypePassword={reTypePassword}
        />
        <FirstName
          onFirstNameChildChange={setFirstName}
          firstName={firstName}
        />
        <LastName onLastNameChildChange={setLastName} lastName={lastName} />
        <Birth onBirthChildChange={setBirth} birth={birth} />
        <Place onPlaceChildChange={setPlace} place={place} />
        <PhoneNumber
          onPhoneNumberChildChange={setPhoneNumber}
          phoneNumber={phoneNumber}
        />
        <Session onSessionChildChange={setSession} session={session} />
        <BasicClass
          onBasicClassChildChange={setClass}
          session={session !== "" ? session : null}
          clazz={clazz}
        />
        <Gender onGenderChildChange={setGender} gender={gender} />
        <button type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </>
  )
}

export default AddStudent
