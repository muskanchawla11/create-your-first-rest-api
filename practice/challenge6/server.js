import {getData} from './getData.js'
//first set up your server
import http from 'node:http';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs/promises'



const createServer=http.createServer(async(req,res)=>{
try{
const parsedData=await getData();
//create a server
//server this to webpage
if(req.url==='/api'){
    res.setHeader('Content-Type','application/json')
    res.statusCode=200
    res.end(JSON.stringify(parsedData));
}
else{
    res.statusCode=404
    res.end('Not found')
}

}
catch(err){
    res.statusCode=404
    res.end('try later , sorry 404')

}
})
//listen to that server
createServer.listen(3000,()=>{
console.log('server connected')
})