import * as wasm from "./csrf_wasm_bg.wasm";
export * from "./csrf_wasm_bg.js";
import { __wbg_set_wasm } from "./csrf_wasm_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
