
export const ISOtoTimeString = (ISOString) => {
  const dateTime = new Date(Date.parse(ISOString))

  const dateSTR =
    `${addFrontZero(dateTime.getDate())}/${addFrontZero(dateTime.getMonth()+1)}/${dateTime.getFullYear()}`
  const timeSTR = `${addFrontZero(dateTime.getHours())}:${addFrontZero(dateTime.getMinutes())}`

  return `${dateSTR} ${timeSTR}`
}

const addFrontZero = (arg) => {
  if (String(arg).length === 1) {
    return `0${arg}`
  } else {
    return arg
  }
}

export const timeStringToISO = (date, time) => {
  const day = date.split('-')[2]
  const month = date.split('-')[1]
  const year = date.split('-')[0]

  const hours = time.split(':')[0]
  const minutes = time.split(':')[1]

  return Date.parse(`${year}-${month}-${day}T${hours}:${minutes}:00.000+0200`)
}