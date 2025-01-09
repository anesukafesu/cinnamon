import { exit } from "process";

export function error(message) {
  console.log(message);
  exit();
}
