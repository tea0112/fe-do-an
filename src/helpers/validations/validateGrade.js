function validateFirstName(text) {
  const regex = /\./g
  if (
    parseFloat(text) >= 0 &&
    parseFloat(text) <= 10 &&
    text.match(regex) !== null
  ) {
    if (text.match(regex).length < 2) return { isValid: true, errorMessage: "" }
  }
  return {
    isValid: false,
    errorMessage: "Điểm Nằm Trong Khoảng Từ 0-10",
  }
}

export default validateFirstName
