import fs from 'fs'

export const data = [
  {
    id: 0,
    text: 'test text number 1 test text number 1 test text number 1 test text number 1',
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    completionDateTime: '2022-05-03T09:07',
    completed: false,
    priority: 'high',
  },
  {
    id: 1,
    text: 'test text number 2 test text number 2 test text number 2 test text number 2',
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    completionDateTime: '2022-05-03T09:07',
    completed: false,
    priority: 'usual',
  },
  
]

function recover() {
  fs.writeFile('todos.json', JSON.stringify(data, null, 2), (error) => {
    if (error) console.log('unable to recover data: ', error);
  })
}

recover()