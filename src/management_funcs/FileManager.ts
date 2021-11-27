import { existsSync, mkdirSync, lstatSync, readdirSync, PathLike } from 'fs';

export function makeDirectory(pth: PathLike) {
	mkdirSync(pth, { recursive: true });
}

export function isDir(dir: PathLike) {
	// return if the directory exists
	// Thanks to Jossef Harush!
	return existsSync(dir) && lstatSync(dir).isDirectory();
}

export function dirIsEmpty(dir: PathLike) {
	// Thanks to Russell Chrisholm!
	const size = readdirSync(dir).length;
	return size === 0;
}
