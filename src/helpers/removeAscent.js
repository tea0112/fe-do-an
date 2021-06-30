function removeAscent(str) {
  if (str === null || str === undefined) return str
  // eslint-disable-next-line no-param-reassign
  str = str.toLowerCase()
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/đ/g, "d")
  return str
}

export default removeAscent
