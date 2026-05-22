import path from 'node:path'

export default function testPath(dir){
   
    //path JOIN ->JOINS FILE PATH SEGMENTS INTO ONE CONSISTENT OS SAVE STRING
    //absolute path
const absPathToResource = path.join(dir, 'public', 'index.html')
  console.log('testPath: ', absPathToResource)

  const relPathToResource = path.join( 'public', 'index.html')
  console.log('testPath: ', relPathToResource)
}