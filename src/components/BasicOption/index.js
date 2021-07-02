function BasicOption(props) {
  return props.options.map((option) => (
    <option key={option.id} value={option[`${props.valueProperty}`]}>
      {option[`${props.content}`]}
    </option>
  ))
}

export default BasicOption
