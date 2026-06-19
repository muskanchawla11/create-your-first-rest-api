import express from 'express'

const app = express()
//middleware : each one would call next and pass control down , in these two cases we have done this manually
app.use((req, res, next) => {

    console.log('Custom headers added')
    next()

})

app.use((req, res, next) => {

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()

})

app.get('/', (req, res) => {
    res.send('<!doctype html><html><body>Hello Express!</body></html>')
})

app.listen(8000, () => console.log('listening 8000')) 

//we have used some npm middleware
//app.use(cors()) it is calling next under the hood and also passing the control down the code

//also build in middleware
/*
app.use('/api',appRouter)
this will end the response by passing it to /api route
if route not exist it will underhood called next which will pass control down to the code


*/