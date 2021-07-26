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

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly generateTokenPair: (a: number, b: number, c: number) => number;
  readonly verifyTokenPair: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
