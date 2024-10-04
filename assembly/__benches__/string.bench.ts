import { bs } from "../custom/bs";
import { serializeBool, serializeBool_BS } from "../serialize/bool"
import { serialize_simd_v1, serializeString, serializeString_BS } from "../serialize/string";

const out = memory.data(65536);

bench("UTF-16 to UTF-8", () => {
    blackbox<ArrayBuffer>(String.UTF8.encode(blackbox<string>("hello world")))
})
// bench("Serialize String Native", () => {
//     blackbox<string>(serializeString("hello \"world abc"));
// });

// bench("Serialize String Sink", () => {
//     serializeString_BS("hello \"world abc");
//     bs.reset();
// });

// bench("Serialize String SIMD", () => {
//     serialize_simd_v1("hello \"world abc", out);
// })