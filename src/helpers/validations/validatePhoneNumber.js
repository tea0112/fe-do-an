function validatePhoneNumber(text) {
  const regex = new RegExp("((01|02|03|04|05|06|07|08|09)+([0-9]{8})\\b)")
  if (regex.test(text) && text.length === 10) {
    return { isValid: true, errorMessage: "" }
  }
  return {
    isValid: false,
    errorMessage: "Số điện thoại chứa 10 ký tự là số, bắt đầu từ 0",
  }
}

export default validatePhoneNumber
