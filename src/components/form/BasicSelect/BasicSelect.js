function BasicSelect({ label, value, onChange, id, children }) {
  return (
    <>
      <div className="form-group">
        {label}
        <select
          className="form-control"
          id={id}
          onChange={onChange}
          value={value}
        >
          {children || null}
        </select>
      </div>
    </>
  )
}

export default BasicSelect
