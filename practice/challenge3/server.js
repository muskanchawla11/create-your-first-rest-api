import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path"
import {fileURLTopath} from "node:url";
//i want to read index.js
//get the path of the file you want to read
const __dirName=path.dirname(fileURLToPath(import.meta.url));
const fileName=path.join(__dirname,'public','index.html');//relative path
const fileContent=await fs.readFile(fileName);

const server=http.createServer((req,res)=>{
    //show content of html file
    res.setHeader('Content-Type','text/html');
    res.statusCode=200;
    res.end(fileContent);
})

server.listen(8000,()=>console.log('server is listening'));