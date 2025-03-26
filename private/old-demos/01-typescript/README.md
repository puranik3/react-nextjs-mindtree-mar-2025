1. From the folder of your choice (project folder)
```
npm init -y
```
- We have a `package.json`
- Installing TS compiler
```
npm i --save-dev typescript
```
- We have TS installed, and the `tsc` compiler in `./node_modules/.bin`
- Want to compile single file `./src/01-hello-world.ts`
```
./node_modules/.bin/tsc ./src/01-hello-world.ts
```
- We set up the TS config file
```
./node_modules/.bin/tsc --init
```
- Reference: https://www.typescriptlang.org/
- Add `scripts` section in `package.json`, and add this within
```
"build": "tsc"
```
- Run the script
```
npm run build
```
- Add watch script
```
"build:watch": "tsc --watch"
```
- Run the watch script
```
npm run build:watch
```