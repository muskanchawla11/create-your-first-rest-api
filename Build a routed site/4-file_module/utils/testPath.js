import path from "node:path";
export default function testPath(dir) {
    const absolutePath=path.join(dir,'public','index.html');
    return absolutePath;
    
}
