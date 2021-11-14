import fs from "fs";
import {dirIsEmpty, isDir, makeDirectory} from "../FileManager.js";
import path from "path";
import assert from "assert";

//  Thanks to Thibault Polge of wyag.thb.lt. Much is heavily lifted from his Python tutorial

class GraphStore {
    // A place to store all the data of a given graph.
    // initialize by defining the root location
    constructor(dir, force = false) {
        // this.user or whatever
        this.worktree = dir // Graph root
        this.pholDir = path.join(dir, '.pholdir')

        if (force === false || !isDir(this.pholDir)) {
        // verify dir exists, and if a subdir 'pholdir' already exists
            throw `Not a Pholcidae directory: ${dir}` //? feels ungraceful
        }

    }
    joinPathToStoreRoot(fn){
        return path.join(this.pholDir, fn)
    }
    addFileToStore(mkdir = false, fn){
        // Returns formatted path to parent directory of file
        if (this.addFolderToStore(mkdir, fn)){
            return this.joinPathToStoreRoot(fn)
        }
    }
    addFolderToStore(mkdir = false, fn){
        // Same as addFileToStore, but can make the directory
        const newPath = this.joinPathToStoreRoot(fn)

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
}

export function createGraphStore(fp, force){
    const store = new GraphStore(fp, force)

    if (fs.existsSync(store.worktree)){
        if (!isDir(store.worktree)){
            throw `Failed to initialize new GraphStore: worktree is not a directory: ${store.worktree}`
        }
        if (!dirIsEmpty(store.worktree)){
            throw `Failed to initialize new GraphStore: worktree is not empty: ${store.worktree}`
        }
    }
    else {
        makeDirectory(store.worktree)
    }

    // Initialize folder structure, subject to change:
    assert(store.addFolderToStore(true, "branches"))
    assert(store.addFolderToStore(true, "objects"))
    assert(store.addFolderToStore(true, "refs/tags"))
    assert(store.addFolderToStore(true, "refs/heads"))


    return store
}

export function findGraphStore(dir=".", required = true){
    const storePath = path.resolve(dir)

    if (isDir(path.join(storePath, ".pholdir"))){
       return storePath
    }
    const dirParent = path.resolve(path.join(storePath, ".."))

    if (dirParent === dir){
        if (required){
            throw "No Pholcidae directory found"
        }
        else{
            return false
        }
    }
    return findGraphStore(parent, required)
}