import {addFileToStore} from "./GraphStoreManager";
import fs from "fs";
import zlib from "zlib";

export function readObject(repo, sha){
    // Crack off the last 2 bits for object type and the first 2 for storage
    const fp = addFileToStore(repo, "objects", sha.slice(0,2), sha.slice(2))

    
}