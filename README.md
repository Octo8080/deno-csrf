# deno-csrf
Provides Deno with the CSRF protection of rust-csrf.

# Usage

```sh
$ git clone git@github.com:Octo8080/deno-csrf.git
$ deno
Deno 1.12.0
exit using ctrl+d or close()

> import {computeTokenPair, computeVerifyTokenPair} from "./deno-csrf/mod.ts"
Check file:///usr/src/app/deno-csrf/mod.ts

> let pair = computeTokenPair("01234567012345670123456701234567",123)
undefined

> pair
{
  isSucccess: true,
  tokenStr: "i3Gi0Gy1orrz~~~~8jZM7NCvkns...",
  cookieStr: "NGHpiZ1ee+B~~~~cq8613dHD9jS..."
}

> computeVerifyTokenPair("01234567012345670123456701234567", pair.tokenStr, pair.cookieStr)
true
```