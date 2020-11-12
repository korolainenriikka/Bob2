import '@testing-library/jest-dom/extend-expect'
import { ISOtoTimeString, timeStringToISO } from '../utils/timeConversion'

test('ISOtoTimeStringConvertsInRightFormat', () => {
  const timestamp = '2020-11-12T10:06:18'

  const timeString = ISOtoTimeString(timestamp)
  expect(timeString).toBe('12/11/2020 10:06')
})

test('timeStringToISOconvertsRight', () => {
  const date = '2020-11-01'
  const time = '23:59'
  const timestamp = timeStringToISO(date, time)
  expect(timestamp).toBe(Date.parse('2020-11-01T23:59:00.000+0200'))
})