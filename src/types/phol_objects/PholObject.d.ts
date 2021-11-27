import { PathLike } from 'fs';

export interface PholObject {
  repo: PathLike;
  data: string;

  serialize(): string;

  deserialize(): string;
}
