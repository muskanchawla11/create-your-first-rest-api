//accept the data coming from a post req -> endpoint -> sub

import path from 'node:path'
import http from 'node:http'
import fs from 'node:fs/promises'
import { getContentType } from './utils/getContentType.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

  if(req.url==='/sub' && req.method==='POST'){
    let body='';
    for await(const chunks of req){
      body+=chunks;
    }
    try{
      //sending the response back
      const emailObj=JSON.parse(body);
      console.log(emailObj);
      res.statusCode=201;
      res.setHeader('Content-Type','application/json');
      res.end(JSON.stringify(emailObj));
    }
  
  catch(error){
    console.log(error);

  }
}



  /* handle post here*/
else{
  const publicDir = path.join(__dirname, 'public')
  const pathToResource = path.join(
    publicDir, 
    req.url === '/' ? 'index.html' : req.url
  )

  const content = await fs.readFile(pathToResource)

  const extName = path.extname(pathToResource)
 
  const contentType = getContentType(extName)

  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  res.end(content)
}
})


server.listen(PORT, () => console.log('connected on port 8000'))