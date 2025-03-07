// rust-csrf を deno より使うためのWASM実装
use wasm_bindgen::prelude::*;
use csrf::{AesGcmCsrfProtection, HmacCsrfProtection, CsrfProtection};
use data_encoding::BASE64;
extern crate console_error_panic_hook;
use serde::{Serialize};
use gloo_utils::format::JsValueSerdeExt;

// JavaScript のオブジェクト定義
#[derive(Serialize)]
struct TokenPair {
    token_str: String,
    cookie_str: String,
}

// JavaScript のオブジェクト形式で返り値を作成する
#[no_mangle]
fn js_token_pair_builder(values: &[&str]) -> JsValue {
    let myobj = TokenPair {
        token_str: values[0].to_string(),
        cookie_str: values[1].to_string()
    };
    JsValue::from_serde(&myobj).unwrap()
}

// &[u8] を[u8; 32] に力技で変換
#[no_mangle]
fn convert_u8_u832(src: &[u8] ) -> [u8; 32] {
  let mut res = [0; 32];
  for i in 0..31 {
    res[i] = src[i]
  }
  return res
}

// AesGcmCsrfProtection インスタンスを返す
fn aes_gcm_protect_instance(aead_key: String) -> AesGcmCsrfProtection{
    console_error_panic_hook::set_once();
    let s = convert_u8_u832(aead_key.as_str().as_bytes());
    return AesGcmCsrfProtection::from_key(s);
}

// HmacCsrfProtection インスタンスを返す
fn hmac_protect_instance(aead_key: String) -> HmacCsrfProtection{
    console_error_panic_hook::set_once();
    let s = convert_u8_u832(aead_key.as_str().as_bytes());
    return HmacCsrfProtection::from_key(s);
}

// AES-GCMで生成したトークンペア(トークン＋cookie)を返す
#[wasm_bindgen (js_name = generateAesGcmTokenPair)]
#[no_mangle]
pub fn generate_aes_gcm_token_pair(aead_key: String, ttl_seconds: i32) -> JsValue {
    console_error_panic_hook::set_once();
    let protect = aes_gcm_protect_instance(aead_key);

    let (token, cookie) = protect.generate_token_pair(None, ttl_seconds as i64).expect("couldn't generate token/cookie pair");
    return js_token_pair_builder(&[&token.b64_string(), &cookie.b64_string()])
}

// HMACで生成したトークンペア(トークン＋cookie)を返す
#[wasm_bindgen (js_name = generateHmacTokenPair)]
#[no_mangle]
pub fn generate_hmac_token_pair(aead_key: String, ttl_seconds: i32) -> JsValue {
    console_error_panic_hook::set_once();
    let protect = hmac_protect_instance(aead_key);

    let (token, cookie) = protect.generate_token_pair(None, ttl_seconds as i64).expect("couldn't generate token/cookie pair");
    return js_token_pair_builder(&[&token.b64_string(), &cookie.b64_string()])
}

// AES-GCMでトークンペア(トークン＋cookie)を検証する
#[wasm_bindgen (js_name = verifyAesGcmTokenPair)]
#[no_mangle]
pub fn verify_aes_gcm_token_pair(aead_key: String, token_str: String, cookie_str: String) -> bool {
    console_error_panic_hook::set_once();
    let protect = aes_gcm_protect_instance(aead_key);
    
    let token_bytes = BASE64.decode(token_str.as_bytes()).expect("token not base64");
    let cookie_bytes = BASE64.decode(cookie_str.as_bytes()).expect("cookie not base64");

    let parsed_token = protect.parse_token(&token_bytes).expect("token not parsed");
    let parsed_cookie = protect.parse_cookie(&cookie_bytes).expect("cookie not parsed");

    protect.verify_token_pair(&parsed_token, &parsed_cookie).is_ok()
}

// HMACでトークンペア(トークン＋cookie)を検証する
#[wasm_bindgen (js_name = verifyHmacTokenPair)]
#[no_mangle]
pub fn verify_hmac_token_pair(aead_key: String, token_str: String, cookie_str: String) -> bool {
    console_error_panic_hook::set_once();
    let protect = hmac_protect_instance(aead_key);
    
    let token_bytes = BASE64.decode(token_str.as_bytes()).expect("token not base64");
    let cookie_bytes = BASE64.decode(cookie_str.as_bytes()).expect("cookie not base64");

    let parsed_token = protect.parse_token(&token_bytes).expect("token not parsed");
    let parsed_cookie = protect.parse_cookie(&cookie_bytes).expect("cookie not parsed");

    protect.verify_token_pair(&parsed_token, &parsed_cookie).is_ok()
}
