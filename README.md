# deno-csrf
Provides Deno with the CSRF protection of rust-csrf.

# Usage

Please clone the repository.

```sh
$ git clone git@github.com:Octo8080/deno-csrf.git
```

The sample code for execution is as follows.

```js
import {computeTokenPair, computeVerifyTokenPair} from "./deno-csrf/mod.ts"

const pair = computeTokenPair("01234567012345670123456701234567",123)
// {
//   isSucccess: true,
//   tokenStr: "i3Gi0Gy1orrz~~~~8jZM7NCvkns...",
//   cookieStr: "NGHpiZ1ee+B~~~~cq8613dHD9jS..."
// }

const result = computeVerifyTokenPair("01234567012345670123456701234567", pair.tokenStr, pair.cookieStr)
console.log(result)
// => true

```