import { PathLike } from "fs";

interface PholObject {
  repo: PathLike
  data: string
  serialize(): string
  deserialize(): string
}