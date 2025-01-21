# wasm-csrf(Old name: deno-csrf)

Provides Deno with the CSRF protection of [rust-csrf](https://crates.io/crates/csrf).

## Usage

The sample code for execution is as follows.

```js
import { 
  computeAesGcmTokenPair,
  computeVerifyAesGcmTokenPair,
  computeHmacTokenPair,
  computeVerifyHmacTokenPair
} from "@octo/wasm-csrf";

// AES-GCM
//
const pair1 = computeAesGcmTokenPair("01234567012345670123456701234567",123)
// {
//   isSucccess: true,
//   tokenStr: "i3Gi0Gy1orrz~~~~8jZM7NCvkns...",
//   cookieStr: "NGHpiZ1ee+B~~~~cq8613dHD9jS..."
// }

const result1 = computeVerifyAesGcmTokenPair(
  "01234567012345670123456701234567",
  pair1.tokenStr,
  pair1.cookieStr
);

console.log(result1)
// => true

// HMAC
//
const pair2 = computeHmacTokenPair("01234567012345670123456701234567",123)

const result2 = computeVerifyHmacTokenPair(
  "01234567012345670123456701234567",
  pair2.tokenStr,
  pair2.cookieStr
);

console.log(result2)
// => true
```
