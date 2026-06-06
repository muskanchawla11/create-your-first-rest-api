//first set up your server
import http from 'node:http';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs/promises'
import {getContentType} from './utils/types.js'
//create server
const server=http.createServer(async(req,res)=>{
    //find the path of the file , which will be fetched from what user has typed
    const __dirname=path.dirname(fileURLToPath(import.meta.url));

    const absolutePath=path.join(__dirname,"public");
    const absolutePathExt=path.join(absolutePath,req.url=='/'?'index.html':req.url);
    //browser have to load it so browser needs the content type
    //finding content type using types file
    //get ext name first 
    const extName=path.extname(absolutePathExt);
 
    try{
    const data=await fs.readFile(absolutePathExt);
    res.setHeader('Content-Type',getContentType(extName));
    res.statusCode=200;
    res.end(data);
    }

    catch(err){
        if(err.code==='ENOENT'){
            res.statusCode=404;
            res.setHeader('Content-Type','text/html');
            res.end(await fs.readFile(path.join(absolutePath,'404.html')));
        }
        else{
            res.statusCode=500;
            res.end();
        }
    }

})



//listen to your server
server.listen(3000,()=>{
    console.log('server started')
})