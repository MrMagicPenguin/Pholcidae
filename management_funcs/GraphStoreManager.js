import path from "path";
import fs from "fs";
import {isDir, makeDirectory} from "./FileManager.js";

export function joinPathToStoreRoot(store, fp){
    const fn = fp.join('/')
    return path.join(store.pholDir, fn)
}
export function addFileToStore(store, mkdir = false, ...fp){
    // get file path of File to Store
    // Also requests parent folders be created
    const fn = fp.slice(0,-1)
    if (addFolderToStore(store, mkdir, fn)){
        return joinPathToStoreRoot(store, fp)
    }
}
export function addFolderToStore(store, mkdir = false, ...fp){
    // Creates folder from String[] of dirnames

    //! When passing the array `fn` from addFileToStore,
    //! if the length is longer than 2 elements, it creates a 2D Array.
    //! A better solution is surely out there, but for now we have stinky code.2
    fp = fp.flat()

    const newPath = joinPathToStoreRoot(store, fp)
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