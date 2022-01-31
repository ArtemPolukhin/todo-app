
export const months = {
    'January': 31, 
    'February': 28, 
    'March': 31, 
    'April': 30, 
    'May': 31, 
    'June': 30, 
    'July': 31, 
    'August': 31, 
    'September': 30, 
    'October': 31, 
    'November': 30, 
    'December': 31
}

export const years = Array(10).fill().map((undefined, index) => new Date().getFullYear() + index)

export const dayOfWeek = [
  'Sun',
  'Mon', 
  'Tue', 
  'Wed', 
  'Thu', 
  'Fri', 
  'Sat',  
]

export const getFilledArray = (number) => {
  return Array(number).fill().map((undefined, index) => {
    return index > 9 ? index.toString() : index = '0' + index++ 
  })
}

export const hours = getFilledArray(24)
export const minutes = getFilledArray(60)

