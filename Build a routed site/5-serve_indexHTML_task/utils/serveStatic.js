import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'

export async function serveStatic(req, res, baseDir) {
  
  const filePath = path.join(baseDir, 'public', 'index.html')

  try {
    const content = await fs.readFile(filePath)
    sendResponse(res, 200, 'text/html', content)
  } catch (err) {
    console.log(err)
  }

/*
Challenge 3:

- Import sendResponse() and use it to serve index.html. 
  Pass in all of the information sendResponse() is expecting.
  serveStatic() will need another param. What is it?

  Make any changes necessary in server.js and delete any unneeded code.

*/

}
