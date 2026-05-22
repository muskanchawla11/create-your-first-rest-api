//setWrite() vs setHeader()
import http from 'node:http'

const PORT = 8000

const server = http.createServer((req, res) => {

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    
//res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Methods': 'POST'})


    //now the problem with this is :
    //writeHead has already send the headers immediately so the headers unneath will be ignored
    //it wont give any error but give a unexpected response
    //CAN BE FIXED : bring setHeader above writeHead
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')

    res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Methods': 'POST'})
    res.end('<html><h1>The server is working</h1></html>')

})

server.listen(PORT, ()=> console.log(`Connected on port: ${PORT}`))


/*
 What’s the difference?

res.setHeader()

Sets a response header but doesn't send it immediately.

Allows you to set or modify headers individually, at any point before sending the response.

res.writeHead()

Sends any headers immediately.

No further modification is possible.
 */

/*
Potential problems

• A header set using setHeader() after writeHead() will not be included in the response.

• A header set using setHeader() can be overruled by a header set with writeHead().


*/