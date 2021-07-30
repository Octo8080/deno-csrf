#!/bin/sh

cargo install wasm-bindgen-cli
rustup target add wasm32-unknown-unknown
cargo build --lib --target wasm32-unknown-unknown
#wasm-bindgen --target deno target/wasm32-unknown-unknown/debug/csrf_wasm.wasm --out-dir ./pkg
wasm-bindgen --target bundler target/wasm32-unknown-unknown/debug/csrf_wasm.wasm --out-dir ./pkg-j