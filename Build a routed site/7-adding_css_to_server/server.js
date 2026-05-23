/*
  Error 1 — EADDRINUSE (port already in use)
  What: You ran node server.js twice, or an old server was still running.
  Fix: Press Ctrl+C in that terminal, or run: lsof -i :3000 then kill <PID>

  Error 2 — ENOENT (file not found)
  What: Browser asked for a file that is not in public/ (e.g. Chrome’s .well-known/... file).
        readFile failed and crashed the whole server.
  Fix: try/catch below — send 404 for missing files so the server keeps running.
*/

import path from 'node:path'
import http from 'node:http'
import fs from 'node:fs/promises'
import { getContentType } from './utils/getContentType.js'

const PORT = 3000

const __dirname = import.meta.dirname 

const server = http.createServer(async (req, res) => {

  const publicDir = path.join(__dirname, 'public')
  const pathToResource = path.join(
    publicDir, 
    req.url === '/' ? 'index.html' : req.url)

  try {
    const content = await fs.readFile(pathToResource)

    const ext = path.extname(pathToResource)
    const contentType = getContentType(ext)

    res.statusCode = 200
    res.setHeader('Content-Type', contentType)
    res.end(content)
  } catch (err) {
    // fix for Error 2 (ENOENT) — missing file, don’t crash
    if (err.code === 'ENOENT') {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end('Not found')
      return
    }
    throw err
  }

})

server.listen(PORT, () => console.log(`connected on port ${PORT}`))