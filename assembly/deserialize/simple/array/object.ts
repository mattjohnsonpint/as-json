import { BRACE_LEFT, BRACE_RIGHT } from "../../../custom/chars";
import { JSON } from "../../..";

export function deserializeObjectArray<T extends unknown[]>(srcStart: usize, srcEnd: usize, dst: usize): T {
  const out = changetype<T>(dst);
  let lastIndex: usize = 0;
  let depth: u32 = 0;
  while (srcStart < srcEnd) {
    const code = load<u16>(srcStart);
    if (code == BRACE_LEFT && depth++ == 0) {
      lastIndex = srcStart;
    } else if (code == BRACE_RIGHT && --depth == 0) {
      out.push(JSON.__deserialize<valueof<T>>(lastIndex, srcStart));
    }
    srcStart += 2;
  }
  return out;
}
