#!/bin/sh

cargo install wasm-bindgen-cli
rustup target add wasm32-unknown-unknown
cargo build --lib --release --target wasm32-unknown-unknown
wasm-bindgen --target deno target/wasm32-unknown-unknown/release/csrf_wasm.wasm --out-dir ./pkg