import fs from 'fs'
import {addFileToStore} from "./GraphStoreManager.js";
import crypto from 'crypto'
import {PholBlob} from "../phol_objects/PholBlob.js";


export function readObject(store, sha){
    const fp = addFileToStore(store, false, "objects", sha.slice(0,2), sha.slice(2))

    fs.readFile(fp, (err, res)=>{
        if (err)
            throw err
        res = res.toString()
        const formatEnd = res.toString().search('\x20')
        const format = res.slice(0, formatEnd)


        // validate obj size
        const messageStart = res.search('\x00')
        const msgSize = res.slice(messageStart).length

        if (msgSize !== res.length-messageStart){
            throw `Malformed object, inconsistent length`
        }
        // get proper constructor, return it somehow..
        switch (format){
            case "b":
                console.log("Object format is blob")
                return new PholBlob(store, res.slice(messageStart))
            case "t":
                console.log("object format is Tree")
                break
            default:
                throw `No matching format found: ${format}`
        }
    })
}
export function writeObject(store, data){
    const header = Buffer.from('b') + Buffer.from('\x20') + Buffer.byteLength(data) + Buffer.from('\x00')
    const outBuffer = header + Buffer.from(data)

    // shasum contents for file id
    const shasum = crypto.createHash('sha1')
        .update(outBuffer)
        .digest('hex')

    const fp = addFileToStore(store, true, "objects", shasum.slice(0,2), shasum.slice(2))

    fs.writeFile(fp, outBuffer, (err)=>{
        if (err)
            throw err
    })
    return shasum

}

export function object_find(repo, name, fmt= null, follow= true) {
    return name
}

