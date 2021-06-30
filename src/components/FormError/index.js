function FormError({ errorMessage, isHidden }) {
  if (isHidden) return null
  return <div style={{ color: "red" }}>{errorMessage}</div>
}

export default FormError
