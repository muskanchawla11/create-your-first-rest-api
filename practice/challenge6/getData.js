import path from 'node:path'
import fs from 'node:fs/promises'

import {fileURLToPath} from 'url'
export async function getData() {

/*
Challenge:
1. getData() should: 
    - read the json in json.data as a string 
    - parse it to JS 
    - return the parsed data. 

   If there’s an error, it should return an empty array (think, why are we doing this?).

hint.md for help
*/
const __dirname=path.dirname(fileURLToPath(import.meta.url));

const absolutePath=path.join(__dirname,'data','data.json');
try{
const data=await fs.readFile(absolutePath);

const parsedData=JSON.parse(data);

return parsedData
}
catch(err){
    return [];
}

  
}