function validateSessionName(text) {
  const regex = new RegExp("^[a-zA-Z0-9]+$")
  if (regex.test(text) && text.length > 0) {
    return { isValid: true, errorMessage: "" }
  }
  return {
    isValid: false,
    errorMessage: "Chỉ cho phép là chữ hoặc số, viết liền.",
  }
}

export default validateSessionName
