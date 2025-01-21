#!/bin/sh

cd ./wasm
echo "\e[33mBuilding wasm ...\e[m"
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
wasm-pack build

echo "\e[33mCopying wasm to pkg ...\e[m"
cp -r ./pkg ../
cd ../

echo "\e[33mCleaning up wasm ...\e[m"
rm -f ./pkg/.gitignore
rm -f ./pkg/package.json
rm -f ./pkg/README.md

echo "\e[32mDone build wasm!\e[m"
