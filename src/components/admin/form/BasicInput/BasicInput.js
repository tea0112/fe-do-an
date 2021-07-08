function BasicInput({ label, value, onChange, id }) {
  return (
    <>
      <div className="form-group">
        {label}
        <input
          className="form-control"
          type="text"
          id={id}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default BasicInput
