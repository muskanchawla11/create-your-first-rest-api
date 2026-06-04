import http from 'http';
import {fileURLToPath} from 'url';
import fs from "fs/promises";
import path from 'path';
const __dirname=path.dirname(fileURLToPath(import.meta.url))
let count=0;
const server=http.createServer(async(req,res)=>{
    if(req.url==='/'){
const filePath=path.join(__dirname,"public","index.html");
const fileContent=await fs.readFile(filePath);
    res.setHeader('Content-Type','text/html')
    res.statusCode=200;
    res.write(String(count++))
    res.end(fileContent);
    }
    
    else if(req.url==='/style.css'){
        const filePath=path.join(__dirname,"public","style.css");
const fileContent=await fs.readFile(filePath);
    res.setHeader('Content-Type','text/css')
    res.statusCode=200;
    res.end(fileContent);

    }
    
    else {
        res.statusCode = 404;
        res.end('Not found');   // <- ends every other request so it never hangs
    }
})
server.listen(3000,()=>{
    console.log('i am listening');
})