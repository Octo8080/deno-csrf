# deno-csrf

Provides Deno with the CSRF protection of rust-csrf.

## Usage

The sample code for execution is as follows.

```js
import { computeAesGcmTokenPair, computeVerifyAesGcmTokenPair, computeHmacTokenPair, computeVerifyHmacTokenPair } from "https://deno.land/x/deno_csrf@0.0.1/mod.ts"

// AES-GCM
//
const pair = computeAesGcmTokenPair("01234567012345670123456701234567",123)
// {
//   isSucccess: true,
//   tokenStr: "i3Gi0Gy1orrz~~~~8jZM7NCvkns...",
//   cookieStr: "NGHpiZ1ee+B~~~~cq8613dHD9jS..."
// }

const result = computeVerifyAesGcmTokenPair(
  "01234567012345670123456701234567",
  pair.tokenStr as string,
  pair.cookieStr as string
);

console.log(result)
// => true

// HMAC
//
const pair = computeHmacTokenPair("01234567012345670123456701234567",123)

const result = computeVerifyHmacTokenPair(
  "01234567012345670123456701234567",
  pair.tokenStr as string,
  pair.cookieStr as string
);

console.log(result)
// => true

```

## Used tools

Using [js_with_embedded_wasm](https://deno.land/x/js_with_embedded_wasm) to convert the js created for deno by wasm and wasm-bindgen in deno to js with wasm embedded.
