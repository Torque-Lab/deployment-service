
import fs from "fs";
import path from "path";
// we need Array of file as we can not directly upload folder to S3

export const getAllFiles=(folderPath:string){
    let response:string[]=[];// store path of all file
    const allRootFileAndFolders=fs.readdirSync(folderPath);

    allRootFileAndFolders.forEach(file=>{
        const fullFilePath=path.join(folderPath,file)
        if(fs.statSync(fullFilePath).isDirectory()){
            response=response.concat(getAllFiles(fullFilePath))
        }else{
            response.push(fullFilePath);
        };
    })

    return response;
}