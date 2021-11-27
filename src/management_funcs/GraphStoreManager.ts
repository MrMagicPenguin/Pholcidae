import { join } from 'path';
import { existsSync, PathOrFileDescriptor } from 'fs';
import { isDir, makeDirectory } from './FileManager';
import { GraphStore } from '../types/phol_objects/GraphStore';

export function joinPathToStoreRoot(store: GraphStore, fp: string[]): string {
	const fn = fp.join('/');

	return join(store.pholDir.toString(), fn);
}

export function addFileToStore(
	store: GraphStore,
	mkdir = false,
	...fp: string[]
): PathOrFileDescriptor | false {
	// get file path of File to Store
	// Also requests parent folders be created

	const fn = fp.slice(0, -1);

	if (addFolderToStore(store, mkdir, ...fn)) {
		return joinPathToStoreRoot(store, fp);
	}
	return false;
}

export function addFolderToStore(
	store: GraphStore,
	mkdir = false,
	...fp: string[]
): PathOrFileDescriptor | false {
	// Creates path folders

	const newPath = joinPathToStoreRoot(store, fp);

	if (existsSync(newPath)) {
		if (isDir(newPath)) {
			return newPath;
		} else {
			throw `Not a directory ${newPath}`;
		}
	}
	if (mkdir) {
		makeDirectory(newPath);
		return newPath;
	} else return false;
}
