import express from 'express';
import cors from 'cors';
import fs from 'fs'

const app = express()
const PORT = 9000

const corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.options('/', cors())

app.use('/:id', (req, res, next) => {
  console.log('req type:', req.method);
  next()
})

app.get('/', cors(corsOptions), (req, res) => {
  fs.readFile('todos.json', 'utf8', (error, data) => {
    if (error) console.log('error while reading file:', error)

    res.send(data)
  })
})


app.post('/', cors(corsOptions), (req, res) => {
  console.log('body:', JSON.stringify(req.body));

  fs.writeFile('todos.json', JSON.stringify(req.body, null, 2), (error) => {
    if (error) console.log('error when writing to file');
  })

  res.send('post request to react')
})

app.get('/:id', cors(corsOptions), (req, res) => {
  fs.readFile('todos.json', 'utf8', (error, data) => {
    if (error) console.log('error while reading file:', error)

    res.send(data)
  })
})



app.listen(PORT)