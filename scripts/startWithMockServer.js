// @flow

const tasks = require('./tasks');

const createWebpackServer = require('webpack-httpolyglot-server');

const ENV = 'test';

const config = require(`../webpack/devConfig`);
process.env.NODE_CONFIG_ENV = ENV;

tasks.replaceWebpack();

console.log('[Build manifest]');
console.log('-'.repeat(80));
tasks.buildManifests();

console.log('[Copy assets]');
console.log('-'.repeat(80));
tasks.copyAssets('dev', ENV);

console.log('[Webpack Dev]');
console.log('-'.repeat(80));
console.log('If you\'re developing Inject page,');
console.log('please allow `https://localhost:3000` connections in Google Chrome,');
console.log('and load unpacked extensions with `./dev` folder. (see https://developer.chrome.com/extensions/getstarted#unpacked)\n');

// mock backend script runus the same babel for compiling the server as for compiling the website
// this is problematic because we need the nodejs version of the WASM bindings for the server
// we hack it by just loading the nodejs versions here and swapping it into the variables
const { RustModule } = require('../app/api/ada/lib/cardanoCrypto/rustLoader');
const wasmv2 = require('cardano-wallet');
const wasmv3 = require('@emurgo/js-chain-libs-node/js_chain_libs');

RustModule._wasmv2 = wasmv2;
// $FlowFixMe nodejs & browser API have same interface so it's okay
RustModule._wasmv3 = wasmv3;

const { getMockServer } = require('../features/mock-chain/mockServer');
const { resetChain } = require('../features/mock-chain/mockImporter');

getMockServer({ outputLog: true });
resetChain();

createWebpackServer(config.baseDevConfig(ENV), {
  host: 'localhost',
  port: 3000
});
