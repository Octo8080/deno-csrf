import {
  generateAesGcmTokenPair,
  generateHmacTokenPair,
  verifyAesGcmTokenPair,
  verifyHmacTokenPair,
} from "../wasm/pkg/csrf_wasm.js";

export interface CsrfResult {
  isSuccess: boolean;
  tokenStr: string;
  cookieStr: string;
}

const resultBuilder = (
  isSuccess: boolean = false,
  tokenStr: string | undefined = undefined,
  cookieStr: string | undefined = undefined,
): CsrfResult => {
  let result = {
    isSuccess,
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
  cookieStr: string,
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
  cookieStr: string,
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
  computeHmacTokenPair,
  computeVerifyAesGcmTokenPair,
  computeVerifyHmacTokenPair,
};
