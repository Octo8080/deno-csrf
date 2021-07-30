/* tslint:disable */
/* eslint-disable */
/**
* @param {string} aead_key
* @param {number} ttl_seconds
* @returns {any}
*/
export function generateTokenPair(aead_key: string, ttl_seconds: number): any;
/**
* @param {string} aead_key
* @param {string} token_str
* @param {string} cookie_str
* @returns {boolean}
*/
export function verifyTokenPair(aead_key: string, token_str: string, cookie_str: string): boolean;
