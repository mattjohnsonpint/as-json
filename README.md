# AS-JSON

![AssemblyScript](https://img.shields.io/badge/AssemblyScript-blue)
![WebAssembly](https://img.shields.io/badge/WebAssemby-purple)

JSON for AssemblyScript focused on performance, low-overhead, and ease-of-use.

## Installation

```bash
npm install json-as
```

Add the transform to your `asc` command (e.g. in package.json)

```bash
--transform json-as/transform
```

Alternatively, add it to your `asconfig.json`

```
{
  "options": {
    "transform": ["json-as/transform"]
  }
}
```

## Usage

```js
import { JSON } from "json-as/assembly";

// @json or @serializable work here
@json
class Vec3 {
  x!: f32;
  y!: f32;
  z!: f32;
}

@json
class Player {
  firstName!: string;
  lastName!: string;
  lastActive!: i32[];
  age!: i32;
  pos!: Vec3 | null;
  isVerified!: boolean;
}

const player: Player = {
  firstName: "Emmet",
  lastName: "West",
  lastActive: [8, 27, 2022],
  age: 23,
  pos: {
    x: 3.4,
    y: 1.2,
    z: 8.3
  },
  isVerified: true
};

const stringified = JSON.stringify<Player>(player);

const parsed = JSON.parse<Player>(stringified);
```

## Performance

Here are some benchmarks I took with `tinybench` (JavaScript) and `astral` (AssemblyScript).
I took the benchmarks using the stub runtime which doesn't call the Garbage Collector, so you may expect a 10% to 40% decrease from low to high throughput.

Tests are run on Ubuntu/WSL2 with a AMD Ryzen 9 CPU

JavaScript Results

```
NodeJS v20.5.1 - TinyBench v2.5.0 (V8)
┌───────────────────────────┬───────────────┐
│         Task Name         │   ops / sec   │
├───────────────────────────┼───────────────┤
│ 'Stringify Object (Vec3)' │  '1,191,221'  │
│   'Parse Object (Vec3)'   │  '897,759'    │
│ 'Stringify Number Array'  │  '1,552,255'  │
│   'Parse Number Array'    │  '1,225,325'  │
│    'Stringify String'     │  '1,761,011'  │
│      'Parse String'       │  '80,845'     │
└───────────────────────────┴───────────────┘
```

AssemblyScript Results

```
WAVM v0.0.0-prerelease - as-bench v0.0.0-alpha (LLVM)
┌───────────────────────────┬───────────────┐
│         Task Name         │   ops / sec   │
├───────────────────────────┼───────────────┤
│ 'Stringify Object (Vec3)' │  '6,270,322'  │
│   'Parse Object (Vec3)'   │  '8,000,195'  |
│ 'Stringify Number Array'  │  '6,664,937'  │
│   'Parse Number Array'    │  '6,557,357'  │
│    'Stringify String'     │  '6,946,947'  │
│      'Parse String'       │  '10,952,502' │
└───────────────────────────┴───────────────┘
```

```
Wasmtime v11.0.1 - as-bench v0.0.0-alpha (Cranelift)
┌───────────────────────────┬───────────────┐
│         Task Name         │   ops / sec   │
├───────────────────────────┼───────────────┤
│ 'Stringify Object (Vec3)' │  '2,038,684'  │
│   'Parse Object (Vec3)'   │  '4,623,337'  |
│ 'Stringify Number Array'  │  '2,500,947'  │
│   'Parse Number Array'    │  '2,959,180'  │
│    'Stringify String'     │  '3,236,896'  │
│      'Parse String'       │  '5,634,594'  │
└───────────────────────────┴───────────────┘
```

## Issues

Please submit an issue to https://github.com/JairusSW/as-json/issues if you find anything wrong with this library
