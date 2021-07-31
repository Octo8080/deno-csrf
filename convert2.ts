import { parse, existsSync } from "./deps.ts";

const parsedArgs = parse(Deno.args);

// パラメータ検証
// .wasm ファイルパス
const targetWasmFilePath =
  typeof parsedArgs["wasm-file"] === "string" ? parsedArgs["wasm-file"] : "";

if (!targetWasmFilePath) {
  console.error(`--wasm-file is not Set!!\nplease confirm.`);
  Deno.exit();
}

// .js ファイルパス
const targetJsFilePath =
  typeof parsedArgs["js-file"] === "string" ? parsedArgs["js-file"] : "";

if (!targetJsFilePath) {
  console.error(`--js-file is not Set!!\nplease confirm.`);
  Deno.exit();
}

//対象ファイルの存在検証
if (!existsSync(targetWasmFilePath)) {
  console.error(
    `Wasm file [${targetWasmFilePath}] is not Found!!\nplease confirm.`
  );
  Deno.exit();
}

if (!existsSync(targetJsFilePath)) {
  console.error(
    `Js file [${targetJsFilePath}] is not Found!!\nplease confirm.`
  );
  Deno.exit();
}

// wasmの文字列化処理、jsコード埋め込み
const file = Deno.readFileSync(targetWasmFilePath);
const jsCode = Deno.readTextFileSync(targetJsFilePath);


//const file = new URL(import.meta.url).pathname;
//const wasmFile = file.substring(0, file.lastIndexOf(Deno.build.os === 'windows' ? '\\' : '/') + 1) + 'csrf_wasm_bg.wasm';
//const wasmModule = new WebAssembly.Module(Deno.readFileSync(wasmFile));
//const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
//const wasm = wasmInstance.exports;

const noImportJsCode = jsCode
  .split("\n")
  .filter((row) => !row.match(/^const file/))
  .filter((row) => !row.match(/^const wasmFile/))
  .filter((row) => !row.match(/^const wasmModule/))
  .filter((row) => !row.match(/^const wasmInstance /))
  .filter((row) => !row.match(/^const wasm /))
  .join("\n");

let str = `
${noImportJsCode}

const wasmCode = new Uint8Array([
  ${[].slice.call(file)}
]);
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
const wasm = wasmInstance.exports

`;

console.log(str);
