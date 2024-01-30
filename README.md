## @extrnode/sdk package

# Installation

### Yarn

`$ yarn add @extrnode/sdk`

### NPM

`npm install @extrnode/sdk`

## Usage

### Extrnode API

```js
// Create an instance of Extrnode class for interaction with API
import { ExtrnodeApi } from "@extrnode/sdk";

const PROJECT_URL =  'https://solana-mainnet.rpc.extrnode.com/YOUR_TOKEN';
const extrnodeApi =  new ExtrnodeApi({
  url: PROJECT_URL,
});

const programAccounts  = await extrnodeApi.solana.getProgramAccounts({
  pubkey: 'Stake11111111111111111111111111111111111111',
  config: {
    encoding: 'base64',
    limit: 5,
  },
});

programAccounts.response // first page of program accounts
programAccounts.next() //  get next page of program accounts
```
