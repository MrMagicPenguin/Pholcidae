import fs from 'fs'
import path from 'path'

export function makeDirectory(pth){
        fs.mkdir(pth,
            {recursive: true},
            (err) => {
                if (err) {
                    console.log(err);
                }
            });
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

/*
* use fs.existsSync(pth) until this is proven to be actually of any use
export function validateDir(pth){
    try {
        fs.access(pth, err =>{
            if (!err)
                return true
            else
                throw err
        })
    } catch(err){
        return false
    }
}*/
