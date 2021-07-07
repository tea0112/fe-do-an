function BasicOption({ valueProperty, content, options }) {
  return options.map((option) => (
    <option key={option.id} value={option[`${valueProperty}`]}>
      {option[`${content}`]}
    </option>
  ))
}

export default BasicOption
