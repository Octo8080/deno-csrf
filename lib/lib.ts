import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {
  generateAesGcmTokenPair,
  generateHmacTokenPair,
  verifyAesGcmTokenPair,
  verifyHmacTokenPair,
} from "../pkg/csrf_wasm_with_bin.js";

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

const isNumberStr = (s: string) => {
  const regex = new RegExp("[0-9]");
  return regex.test(s);
};

const keyLimit = (key: string): boolean => {
  if (key.length != 32) return false;
  if (!isNumberStr(key)) return false;
  return true;
};

const computeAesGcmTokenPair = (key: string, ttlSeconds: number) => {
  if (!keyLimit(key)) return resultBuilder(false);

  try {
    let { token_str, cookie_str } = generateAesGcmTokenPair(key, ttlSeconds);
    return resultBuilder(true, token_str, cookie_str);
  } catch (error) {
    return resultBuilder(false);
  }
};

const computeVerifyAesGcmTokenPair = (
  key: string,
  tokenStr: string,
  cookieStr: string
) => {
  if (!keyLimit(key)) return false;

  try {
    return verifyAesGcmTokenPair(key, tokenStr, cookieStr);
  } catch (error) {
    return false;
  }
};

const computeHmacTokenPair = (key: string, ttlSeconds: number) => {
  if (!keyLimit(key)) return resultBuilder(false);

  try {
    let { token_str, cookie_str } = generateHmacTokenPair(key, ttlSeconds);
    return resultBuilder(true, token_str, cookie_str);
  } catch (error) {
    return resultBuilder(false);
  }
};

const computeVerifyHmacTokenPair = (
  key: string,
  tokenStr: string,
  cookieStr: string
) => {
  if (!keyLimit(key)) return false;

  try {
    return verifyHmacTokenPair(key, tokenStr, cookieStr);
  } catch (error) {
    return false;
  }
};

export {
  computeAesGcmTokenPair,
  computeVerifyAesGcmTokenPair,
  computeHmacTokenPair,
  computeVerifyHmacTokenPair,
};

let _key = "01234567012345670123456701234567";
let _keyShort = "0123456701234567012345670";

Deno.test("Successful token from AES-GCM verification.", () => {
  let { isSucccess } = computeAesGcmTokenPair(_keyShort, 100);
  assertEquals(isSucccess, false);
});

Deno.test("Successful token from AES-GCM verification.", () => {
  let { tokenStr, cookieStr } = computeAesGcmTokenPair(_key, 100);
  assertEquals(computeVerifyAesGcmTokenPair(_key, tokenStr, cookieStr), true);
});

Deno.test("Failed token from AES-GCM verification anther key.", () => {
  let _anather_key = "01234567012345670123456701234569";
  let { tokenStr } = computeAesGcmTokenPair(_key, 100);
  let antherCookieStr = computeAesGcmTokenPair(_anather_key, 100).cookieStr;

  assertEquals(
    computeVerifyAesGcmTokenPair(_key, tokenStr, antherCookieStr),
    false
  );
});

Deno.test("Failed token from AES-GCM verification not pair.", () => {
  let { tokenStr } = computeAesGcmTokenPair(_key, 100);
  let noPairCookieStr = computeAesGcmTokenPair(_key, 100).cookieStr;

  assertEquals(
    computeVerifyAesGcmTokenPair(_key, tokenStr, noPairCookieStr),
    false
  );
});

Deno.test("Successful token from HMAC verification.", () => {
  let { isSucccess } = computeHmacTokenPair(_keyShort, 100);
  assertEquals(isSucccess, false);
});

Deno.test("Successful token from HMAC verification.", () => {
  let { tokenStr, cookieStr } = computeHmacTokenPair(_key, 100);
  assertEquals(computeVerifyHmacTokenPair(_key, tokenStr, cookieStr), true);
});

Deno.test("Failed token from HMAC verification anther key.", () => {
  let _anather_key = "01234567012345670123456701234569";
  let { tokenStr } = computeHmacTokenPair(_key, 100);
  let anther_cookie_str = computeHmacTokenPair(_anather_key, 100).cookieStr;

  assertEquals(
    computeVerifyAesGcmTokenPair(_key, tokenStr, anther_cookie_str),
    false
  );
});

Deno.test("Failed token from HMAC verification not pair.", () => {
  let { tokenStr } = computeHmacTokenPair(_key, 100);
  let noPairCookieStr = computeHmacTokenPair(_key, 100).cookieStr;

  assertEquals(
    computeVerifyAesGcmTokenPair(_key, tokenStr, noPairCookieStr),
    false
  );
});
