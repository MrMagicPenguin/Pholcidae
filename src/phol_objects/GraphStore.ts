import { existsSync } from "fs";
import {
	dirIsEmpty,
	isDir,
	makeDirectory,
} from "../management_funcs/FileManager";
import { join, resolve } from "path"
import { addFolderToStore } from "../management_funcs/GraphStoreManager"
import {ok} from 'assert'

//  Thanks to Thibault Polge of wyag.thb.lt. Much is heavily lifted from his Python tutorial

class GraphStore {
  // A place to store all the data of a given graph.
  // initialize by defining the root location
  public worktree: string;
  public readonly pholDir: string;

	constructor(dir: string, force = false) {
		// this.user or whatever
    this.worktree = dir; // Graph root
    this.pholDir = join(dir.toString(), ".pholdir");

    if (!force && !isDir(this.pholDir)) {
			// verify dir exists, and if a subdir 'pholdir' already exists
      throw `Not a Pholcidae directory: ${dir}`; //? feels ungraceful
		}
	}
}


export const createGraphStore = (fp: string, force: boolean): GraphStore => {
  const store = new GraphStore(fp, force);

  if (existsSync(store.worktree)) {
    if (!isDir(store.worktree)) {
      throw `Failed to initialize new GraphStore: worktree is not a directory: ${store.worktree}`;
    }
    if (!dirIsEmpty(store.worktree)) {
      throw `Failed to initialize new GraphStore: worktree is not empty: ${store.worktree}`;
    }
  } else {
    makeDirectory(store.worktree);
  }

  // Initialize folder structure, subject to change:
  ok(addFolderToStore(store, true, "branches"));
  ok(addFolderToStore(store, true, "objects"));
  ok(addFolderToStore(store, true, "refs", "tags"));
  ok(addFolderToStore(store, true, "refs", "heads"));

  return store;
}

export function findGraphStore(dir = ".", required = true): GraphStore | false {
  const storePath = resolve(dir);

  if (isDir(join(storePath, ".pholdir"))) {
    return new GraphStore(storePath)
	}
  const dirParent = resolve(join(storePath, ".."));

  if (dirParent === dir) {
    if (required) {
      throw "No Pholcidae directory found";
		} else {
      return false
    }
	}
  return findGraphStore(dirParent, required);
}

