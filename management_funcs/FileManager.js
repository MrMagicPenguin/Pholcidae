import fs from 'fs'
import path from 'path'
import zlib from "zlib";

export function makeDirectory(pth){
        fs.mkdirSync(pth,{recursive: true})
}

export function isDir(dir){
    // return if the directory exists
    // Thanks to Jossef Harush!
    return (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory())
}
export function dirIsEmpty(dir){
    // Thanks to Russell Chrisholm!
    const size = fs.readdirSync(dir).length
    return (size === 0)
}