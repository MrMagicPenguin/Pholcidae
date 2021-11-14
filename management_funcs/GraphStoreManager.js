import path from "path";
import fs from "fs";
import {isDir, makeDirectory} from "./FileManager.js";

export function joinPathToStoreRoot(repo, fp){
    const fn = fp.join('/')

    return path.join(repo.pholDir, fn)
}
export function addFileToStore(repo, mkdir = false, ...fp){
    // Returns formatted path to parent directory of file
    const fn = fp.slice(0,-1)
    if (addFolderToStore(repo, mkdir, fn)){
        return this.joinPathToStoreRoot(fn)
    }
}
export function addFolderToStore(repo, mkdir = false, ...fp){
    // Same as addFileToStore, but can make the directory
    const newPath = joinPathToStoreRoot(repo, fp)

    if (fs.existsSync(newPath)) {
        if (isDir(newPath)) {
            return newPath
        }
        else{
            throw `Not a directory ${newPath}`
        }
    }
    if (mkdir){
        makeDirectory(newPath)
        return newPath
    }
    else
        return false
}