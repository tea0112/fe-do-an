function BasicOption({ valueLabel, content, options, keyLabel }) {
  return (
    options &&
    options.map((option) => (
      <option key={option[`${keyLabel}`]} value={option[`${valueLabel}`]}>
        {option[`${content}`]}
      </option>
    ))
  )
}

export default BasicOption
