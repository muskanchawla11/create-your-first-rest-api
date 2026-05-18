/*
Query Parameters : /api ?name=muskan & country=India
Why : client want to get some specific data from backend
How : how will you extract query parameter from url
*/
import http from "node:http";
const server=http.createServer((req,res)=>{
const urlObject=new URL(req.url,`http://${req.headers.host}`);
const queryObj=Object.fromEntries(urlObject.searchParams);
console.log(queryObj);
})
server.listen(3000,()=>console.log('server listening at port 3000'))