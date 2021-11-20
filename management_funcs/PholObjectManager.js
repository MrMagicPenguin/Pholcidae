import fs from 'fs'
import zlib from "zlib";
import {joinPathToStoreRoot} from "./GraphStoreManager.js";
import * as buffer from "buffer";

export function readObject(obj){
    const readStream = fs.createReadStream(obj, {encoding: "utf8"});
    //const fp = joinPathToStoreRoot(obj, "objects"), sha.slice(0,2), sha.slice(2,0))

    readStream.on('data', (data)=>{
        // deconstruct header
        const formatEnd = data.toString().search('\x20')
        const format = data.slice(0,formatEnd)

        // validate obj size
        const messageStart = data.search('\x00')
        const msgSize = data.slice(messageStart).length

        if (msgSize !== data.length-messageStart){
            throw `Malformed object, inconsistent length`
        }

        // get proper constructor, return it somehow..
        switch (format){
            case "b":
                console.log("Object format is blob")
                break
            case "t":
                console.log("object format is Tree")
                break
            default:
                throw `No matching format found: ${format}`
        }
        // call constructor, return object
    })
}

export function writeObject(fp){
    const writeStream = fs.createWriteStream(fp, {encoding:"utf8"})

    const data = "Hello, great world!"

    const header = Buffer.from('b') + Buffer.from('\x20') + Buffer.byteLength(data) + Buffer.from('\x00')
    const outBuffer = header + Buffer.from(data)

    // Do hashing
    // ...

    writeStream.write(outBuffer)


}

export function object_find(repo, name, fmt= null, follow= true) {
    return name
}

