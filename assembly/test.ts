import "wasi";
import { JSON } from ".";
@json
class Obj {
    hello: "world";
}
const obj: Obj = {
    hello: "world"
}
interface __JSON_Deserialize {
    __JSON_Deserialize: () => usize
}


console.log(JSON.stringify(obj));
console.log(JSON.stringify("Hello World"));
console.log(JSON.stringify(314));
console.log(JSON.stringify(3.14));
console.log(JSON.stringify(true));
console.log(JSON.stringify(false));
console.log(JSON.stringify(["a", "b", "c"]));
Variant