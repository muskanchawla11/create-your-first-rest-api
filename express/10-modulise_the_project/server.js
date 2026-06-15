import express from 'express'
import { apiRouter } from './routes/apiRoutes.js'

const PORT = 8000

/*
Challenge:
1. Refactor the code to use express.Router()
*/

const app = express()

app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
