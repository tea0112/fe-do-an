function validateFirstName(textNumber) {
  const text = textNumber.toString().replace(",", ".")
  const regex = /\./g
  if (parseFloat(text) >= 0 && parseFloat(text) <= 10) {
    if (text.match(regex)) {
      if (text.match(regex).length < 2)
        return { isValid: true, errorMessage: "" }
    } else return { isValid: true, errorMessage: "" }
  }
  return {
    isValid: false,
    errorMessage: "Điểm Nằm Trong Khoảng Từ 0-10",
  }
}

export default validateFirstName
