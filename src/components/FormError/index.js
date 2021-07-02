function FormError({ errorMessage }) {
  if (errorMessage.length === 0) return null
  return <div style={{ color: "red" }}>{errorMessage}</div>
}

export default FormError
