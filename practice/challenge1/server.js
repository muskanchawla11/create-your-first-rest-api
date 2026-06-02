import http from 'node:http'
const server=http.createServer((req,res)=>{
    console.log('server is running')
})
server.listen(3000,()=>console.log('server '))