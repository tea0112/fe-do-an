function validatePassword(text) {
  if (text.length >= 8) {
    return { isValid: true, errorMessage: "" }
  }
  return {
    isValid: false,
    errorMessage: "Mật Khẩu Tối Thiểu 8 Ký Tự",
  }
}

export default validatePassword
