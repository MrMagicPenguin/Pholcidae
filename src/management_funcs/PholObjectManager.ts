import { PathOrFileDescriptor, readFile, writeFile } from "fs";
import {addFileToStore} from "./GraphStoreManager";
import { createHash } from "crypto";
import {findGraphStore} from "../phol_objects/GraphStore";
import { GraphStore } from "../types/phol_objects/GraphStore";
import { PholBlob } from "../phol_objects/PholBlob";


export function readObject(store: GraphStore, sha: string): PholBlob | null{

    const fp = addFileToStore(store, false, "objects", sha.slice(0,2), sha.slice(2))

    if(fp){
        readFile(fp, (err, res)=>{
            if (err)
                throw err
            const resString = res.toString()
            const formatEnd = resString.toString().search('\x20')
            const format = resString.slice(0, formatEnd)


            // validate obj size
            const messageStart = resString.search('\x00')
            const msgSize = resString.slice(messageStart).length

            if (msgSize !== resString.length-messageStart){
                throw `Malformed object, inconsistent length`
            }
            // get proper constructor, return it somehow..
            switch (format){
                case "b":
                    console.log("Object format is blob")
                    console.log(resString.slice(messageStart));
                    return new PholBlob(store, resString.slice(messageStart))
                case "t":
                    console.log("object format is Tree")
                    break
                default:
                    throw `No matching format found: ${format}`
            }
        })
    }
    return null
}

export function writeObject(store: GraphStore, data: string){
    // Write object to FS

    const length = Buffer.from(Buffer.byteLength(data).toString())
    const header = Buffer.concat([Buffer.from('b'), Buffer.from('\x20'), length, Buffer.from('\x00')])
    const outBuffer = Buffer.concat([header, Buffer.from(data)])

    // shasum contents for file id
    const shasum = createHash('sha1')
        .update(outBuffer)
        .digest('hex')

    const fp = addFileToStore(store, true, "objects", shasum.slice(0,2), shasum.slice(2))

    writeFile(<PathOrFileDescriptor>fp, outBuffer, (err)=>{
        if (err)
            throw err
    })
    return shasum

}
export function getObjectStore(dir: string): Promise<GraphStore | false>{
    return new Promise((resolve, reject) => {
        const store = findGraphStore(dir)
        resolve(store)
        reject()
    })
}
export function object_find(repo: any, name: any, fmt= null, follow= true) {
    return name
}

