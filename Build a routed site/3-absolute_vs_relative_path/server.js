import http from 'node:http'
import testPath from './utils/testPath.js'
const PORT = 8000

const __dirname = import.meta.dirname
//ABSOLUTE PATH TO THE FOLDER HOLDING SERVER.JS


//console.log('cwd',process.cwd())

const server = http.createServer((req, res)=> {
testPath(__dirname);
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end()
})

server.listen(PORT, () => console.log('connected on port 8000'))