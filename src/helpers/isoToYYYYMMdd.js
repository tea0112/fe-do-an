function isoToYYYYMMdd(isoDate) {
  const year = isoDate.getFullYear()
  const month = isoDate.getMonth() + 1
  const day = isoDate.getDate()

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`
}

export default isoToYYYYMMdd
