# deno-csrf

Provides Deno with the CSRF protection of rust-csrf.

# Usage

The sample code for execution is as follows.

```js
import {computeTokenPair, computeVerifyTokenPair} from "https://raw.githubusercontent.com/Octo8080/deno-csrf/main/mod.ts"

const pair = computeTokenPair("01234567012345670123456701234567",123)
// {
//   isSucccess: true,
//   tokenStr: "i3Gi0Gy1orrz~~~~8jZM7NCvkns...",
//   cookieStr: "NGHpiZ1ee+B~~~~cq8613dHD9jS..."
// }

const result = computeVerifyTokenPair(
  "01234567012345670123456701234567",
  pair.tokenStr as string,
  pair.cookieStr as string
);

console.log(result)
// => true

```
