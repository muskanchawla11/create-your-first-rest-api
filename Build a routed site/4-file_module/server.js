/*
Get the absolute path of the html file that you want to render on the server
using file system module , read that file and return it as  a res
*/
import http from 'node:http';
import fs from 'node:fs/promises';

import testPath from "./utils/testPath.js";
const __dirname=import.meta.dirname;
const server=http.createServer(async(req,res)=>{
//finding the absolute path of your html file
//create a utility function for that
const absolutePath=testPath(__dirname);
const content=await fs.readFile(absolutePath,'utf8')
//utf8 is optional and is only used for encounding string , so it dont support all type of html example image
console.log(content);
res.setHeader('Content-Type','text/html');
res.statusCode=200;
res.end(content);

})
server.listen(3000,()=>console.log('server listening at port 3000'))