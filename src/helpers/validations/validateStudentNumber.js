function validateStudentNumber(text) {
  const regex = new RegExp("^[-a-zA-Z0-9-]+([-a-zA-Z0-9-]+)*$")
  if (regex.test(text) && text.length > 0) {
    return { isValid: true, errorMessage: "" }
  }
  return {
    isValid: false,
    errorMessage:
      "Mã sinh viên viết liền, chỉ cho phép là chữ hoặc số, không để trống",
  }
}

export default validateStudentNumber
