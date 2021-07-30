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

const noImportJsCode = jsCode
  .split("\n")
  .filter((row) => !row.match(/^import/))
  .join("\n");

let str = `
const wasmCode = new Uint8Array([
  ${[].slice.call(file)}
]);
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule);
const wasm = wasmInstance.exports

${noImportJsCode}
`;

console.log(str);
