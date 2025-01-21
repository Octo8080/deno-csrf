import { assertEquals } from "@std/assert";
import {
  computeAesGcmTokenPair,
  computeHmacTokenPair,
  computeVerifyAesGcmTokenPair,
  computeVerifyHmacTokenPair,
} from "../lib/lib.ts";

Deno.test("AES-GCM", async (t) => {
  const key = "01234567012345670123456701234567";

  await t.step("Successful token from AES-GCM verification.", () => {
    const keyShort = "0123456701234567012345670";
    const { isSuccess } = computeAesGcmTokenPair(keyShort, 100);
    assertEquals(isSuccess, false);
  });

  await t.step("Successful token from AES-GCM verification.", () => {
    const { tokenStr, cookieStr } = computeAesGcmTokenPair(key, 100);
    assertEquals(computeVerifyAesGcmTokenPair(key, tokenStr, cookieStr), true);
  });

  await t.step("Failed token from AES-GCM verification anther key.", () => {
    const anatherKey = "01234567012345670123456701234569";
    const { tokenStr } = computeAesGcmTokenPair(key, 100);
    const antherCookieStr = computeAesGcmTokenPair(anatherKey, 100).cookieStr;

    assertEquals(
      computeVerifyAesGcmTokenPair(key, tokenStr, antherCookieStr),
      false,
    );
  });

  await t.step("Failed token from AES-GCM verification not pair.", () => {
    const { tokenStr } = computeAesGcmTokenPair(key, 100);
    const noPairCookieStr = computeAesGcmTokenPair(key, 100).cookieStr;

    assertEquals(
      computeVerifyAesGcmTokenPair(key, tokenStr, noPairCookieStr),
      false,
    );
  });
});

Deno.test("HMAC", async (t) => {
  const key = "01234567012345670123456701234567";

  await t.step("Successful token from HMAC verification.", () => {
    const keyShort = "0123456701234567012345670";
    const { isSuccess } = computeHmacTokenPair(keyShort, 100);
    assertEquals(isSuccess, false);
  });

  await t.step("Successful token from HMAC verification.", () => {
    const { tokenStr, cookieStr } = computeHmacTokenPair(key, 100);
    assertEquals(computeVerifyHmacTokenPair(key, tokenStr, cookieStr), true);
  });

  await t.step("Failed token from HMAC verification anther key.", () => {
    const anatherKey = "01234567012345670123456701234569";
    const { tokenStr } = computeHmacTokenPair(key, 100);
    const anther_cookie_str = computeHmacTokenPair(anatherKey, 100).cookieStr;

    assertEquals(
      computeVerifyAesGcmTokenPair(key, tokenStr, anther_cookie_str),
      false,
    );
  });

  await t.step("Failed token from HMAC verification not pair.", () => {
    const { tokenStr } = computeHmacTokenPair(key, 100);
    const noPairCookieStr = computeHmacTokenPair(key, 100).cookieStr;

    assertEquals(
      computeVerifyAesGcmTokenPair(key, tokenStr, noPairCookieStr),
      false,
    );
  });
});
