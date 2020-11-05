
export const ISOtoTimeString = (ISOString) => {
  const date = ISOString.split('T')[0]
  const time = ISOString.split('T')[1]

  const year = date.split('-')[0]
  const month = date.split('-')[1]
  const day = date.split('-')[2]

  const hours = time.split(':')[0]
  const minutes = time.split(':')[1]

  const dateSTR = `${day}/${month}/${year}`
  const timeSTR = `${hours}:${minutes}`

  return `${dateSTR} ${timeSTR}`
}

export const timeStringToISO = (date, time) => {
  const day = date.split('/')[0]
  const month = date.split('/')[1]
  const year = date.split('/')[2]

  // timezone conversion UTC -> UTC+2(finland)
  let hours = Number(time.split(':')[0]) + 2
  if (hours < 10){
    hours = `0${hours}`
  }

  const minutes = time.split(':')[1]

  return Date.parse(`${year}-${month}-${day}T${hours}:${minutes}`)
}