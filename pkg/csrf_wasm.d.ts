/* tslint:disable */
/* eslint-disable */
export function generateAesGcmTokenPair(
  aead_key: string,
  ttl_seconds: number,
): any;
export function generateHmacTokenPair(
  aead_key: string,
  ttl_seconds: number,
): any;
export function verifyAesGcmTokenPair(
  aead_key: string,
  token_str: string,
  cookie_str: string,
): boolean;
export function verifyHmacTokenPair(
  aead_key: string,
  token_str: string,
  cookie_str: string,
): boolean;
