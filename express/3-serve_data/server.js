import express from 'express'
import { startups } from './data/data.js'

const PORT = 8000

const app = express()

app.get('/api', (req, res) => {
  res.json(startups)
})

/*
Challenge:
  1. When the client makes a GET request to ‘/api’, serve all of our data as json.

  hint.md for help!
*/

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))

