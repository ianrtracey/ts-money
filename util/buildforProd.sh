#!/usr/bin/env bash

### Backend ###
rm -rf ./build
# transpile .ts to .js
tsc --sourceMap false
cp -r ./src/server/schema ./build/server/schema


### Frontend ###
mkdir -p ./build/client
cd ./src/client
npm run build
mv build/* ../../build/client/
