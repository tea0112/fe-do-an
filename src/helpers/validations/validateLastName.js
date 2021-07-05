import removeAscent from "../removeAscent"

function validateLastName(text) {
  const regex = new RegExp("^[a-zA-Z\\s]*$")
  if (regex.test(removeAscent(text)) && text.length > 0) {
    return { isValid: true, errorMessage: "" }
  }
  return {
    isValid: false,
    errorMessage: "Tên sinh viên chỉ cho phép là chữ, không để trống",
  }
}

export default validateLastName
