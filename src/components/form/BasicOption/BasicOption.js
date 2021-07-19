function BasicOption({ valueLabel, content, options, keyLabel }) {
  if (options !== null && options !== undefined) {
    if (options.length > 0) {
      return options.map((option) => (
        <option key={option[`${keyLabel}`]} value={option[`${valueLabel}`]}>
          {option[`${content}`]}
        </option>
      ))
    }
  }
  return null
}

export default BasicOption
