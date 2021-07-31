import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { generateTokenPair, verifyTokenPair } from "../pkg/csrf_wasm_with_bin.js";

let _key = "01234567012345670123456701234567";

Deno.test("Successful token verification.", () => {
  let { token_str, cookie_str } = generateTokenPair(_key, 100);
  assertEquals(verifyTokenPair(_key, token_str, cookie_str), true);
});

Deno.test("Failed token verification anther key.", () => {
  let _anather_key = "01234567012345670123456701234569";
  let { token_str, cookie_str } = generateTokenPair(_key, 100);
  let anther_cookie_str = generateTokenPair(_anather_key, 100).cookie_str;

  assertEquals(verifyTokenPair(_key, token_str, anther_cookie_str), false);
});

Deno.test("Failed token verification not pair.", () => {
  let { token_str, cookie_str } = generateTokenPair(_key, 100);
  let no_pair_cookie_str = generateTokenPair(_key, 100).cookie_str;

  assertEquals(verifyTokenPair(_key, token_str, no_pair_cookie_str), false);
});

export interface CsrfResult {
  isSucccess: boolean;
  tokenStr: string;
  cookieStr: string;
}

const resultBuilder = (
  isSucccess: boolean = false,
  tokenStr: string | undefined = undefined,
  cookieStr: string | undefined = undefined
): CsrfResult => {
  let result = {
    isSucccess,
    tokenStr: tokenStr || "",
    cookieStr: cookieStr || "",
  };
  return result;
};

const computeTokenPair = (key: string, ttlSeconds: number) => {
  try {
    let { token_str, cookie_str } = generateTokenPair(_key, ttlSeconds);
    return resultBuilder(true, token_str, cookie_str);
  } catch (error) {
    return resultBuilder(false);
  }
};

const computeVerifyTokenPair = (
  key: string,
  tokenStr: string,
  cookieStr: string
) => {
  try {
    return verifyTokenPair(key, tokenStr, cookieStr);
  } catch (error) {
    return false;
  }
};

export { computeTokenPair, computeVerifyTokenPair };
