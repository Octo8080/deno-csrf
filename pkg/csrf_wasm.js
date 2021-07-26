

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* @param {string} aead_key
* @param {number} ttl_seconds
* @returns {any}
*/
export function generateTokenPair(aead_key, ttl_seconds) {
    var ptr0 = passStringToWasm0(aead_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.generateTokenPair(ptr0, len0, ttl_seconds);
    return takeObject(ret);
}

/**
* @param {string} aead_key
* @param {string} token_str
* @param {string} cookie_str
* @returns {boolean}
*/
export function verifyTokenPair(aead_key, token_str, cookie_str) {
    var ptr0 = passStringToWasm0(aead_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(token_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passStringToWasm0(cookie_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len2 = WASM_VECTOR_LEN;
    var ret = wasm.verifyTokenPair(ptr0, len0, ptr1, len1, ptr2, len2);
    return ret !== 0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

const imports = {
    __wbindgen_placeholder__: {
        __wbindgen_json_parse: function(arg0, arg1) {
            var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbindgen_is_undefined: function(arg0) {
            var ret = getObject(arg0) === undefined;
            return ret;
        },
        __wbg_self_86b4b13392c7af56: function() { return handleError(function () {
            var ret = self.self;
            return addHeapObject(ret);
        }, arguments) },
        __wbg_msCrypto_9ad6677321a08dd8: function(arg0) {
            var ret = getObject(arg0).msCrypto;
            return addHeapObject(ret);
        },
        __wbg_crypto_b8c92eaac23d0d80: function(arg0) {
            var ret = getObject(arg0).crypto;
            return addHeapObject(ret);
        },
        __wbg_getRandomValues_dd27e6b0652b3236: function(arg0) {
            var ret = getObject(arg0).getRandomValues;
            return addHeapObject(ret);
        },
        __wbg_getRandomValues_e57c9b75ddead065: function(arg0, arg1) {
            getObject(arg0).getRandomValues(getObject(arg1));
        },
        __wbg_randomFillSync_d2ba53160aec6aba: function(arg0, arg1, arg2) {
            getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_static_accessor_MODULE_452b4680e8614c81: function() {
            var ret = module;
            return addHeapObject(ret);
        },
        __wbg_require_f5521a5b85ad2542: function(arg0, arg1, arg2) {
            var ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
            return addHeapObject(ret);
        },
        __wbg_getTime_55dfad3366aec58a: function(arg0) {
            var ret = getObject(arg0).getTime();
            return ret;
        },
        __wbg_new0_85024d5e91a046e9: function() {
            var ret = new Date();
            return addHeapObject(ret);
        },
        __wbg_new_e8101319e4cf95fc: function(arg0) {
            var ret = new Uint8Array(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_newwithlength_a8d1dbcbe703a5c6: function(arg0) {
            var ret = new Uint8Array(arg0 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_subarray_901ede8318da52a6: function(arg0, arg1, arg2) {
            var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_length_2d56cb37075fcfb1: function(arg0) {
            var ret = getObject(arg0).length;
            return ret;
        },
        __wbg_set_e8ae7b27314e8b98: function(arg0, arg1, arg2) {
            getObject(arg0).set(getObject(arg1), arg2 >>> 0);
        },
        __wbg_buffer_9e184d6f785de5ed: function(arg0) {
            var ret = getObject(arg0).buffer;
            return addHeapObject(ret);
        },
        __wbindgen_object_drop_ref: function(arg0) {
            takeObject(arg0);
        },
        __wbg_error_4bb6c2a97407129a: function(arg0, arg1) {
            try {
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(arg0, arg1);
            }
        },
        __wbg_new_59cb74e423758ede: function() {
            var ret = new Error();
            return addHeapObject(ret);
        },
        __wbg_stack_558ba5917b466edd: function(arg0, arg1) {
            var ret = getObject(arg1).stack;
            var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        },
        __wbindgen_throw: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_memory: function() {
            var ret = wasm.memory;
            return addHeapObject(ret);
        },
    },

};

const file = import.meta;
console.log(file)
const wasmFile = file.substring(0, file.lastIndexOf(Deno.build.os === 'windows' ? '\\' : '/') + 1) + 'csrf_wasm_bg.wasm';
const wasmModule = new WebAssembly.Module(Deno.readFileSync(wasmFile));
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
const wasm = wasmInstance.exports;
