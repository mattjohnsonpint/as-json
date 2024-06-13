import { isSpace } from "util/string";
import { unsafeCharCodeAt } from "../../src/util";
import { commaCode, rightBracketCode } from "../../src/chars";
import { deserializeFloat } from "../float";

// @ts-ignore: Decorator
@inline export function deserializeFloatArray<T extends number[]>(data: string): T {
    const result = instantiate<T>();
    let lastPos = 0;
    let i = 1;
    let awaitingParse = false;
    for (; i < data.length; i++) {
      const char = unsafeCharCodeAt(data, i);
      if (lastPos === 0 && ((char >= 48 && char <= 57) || char === 45)) {
        awaitingParse = true;
        lastPos = i;
      } else if (awaitingParse && (isSpace(char) || char == commaCode || char == rightBracketCode) && lastPos > 0) {
        awaitingParse = false;
        result.push(deserializeFloat<valueof<T>>(data.slice(lastPos, i)));
        lastPos = 0;
      }
    }
    return result;
  }