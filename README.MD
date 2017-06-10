# redux-action-minifier
> This package provides to you possibility to minify your [Flux Standard Action](https://github.com/acdlite/flux-standard-action#flux-standard-action) to send it over the network
---

* [Installation](#installation)
* [Usage](#usage)

## Installation

```sh
npm install redux-action-minifier
```

or with yarn

```sh
yarn add redux-action-minifier
```

## Usage

```javascript

  import { compressor, decompressor } from 'redux-action-minifier';

  const FSA = {
    type: 'UPDATE',
  }

  const compressedFSA = compressor(FSA);

  /*
    compressedFSA now equals to

    {
      t: 'UPDATE',
    }
  */

  const decompressedFSA = decompressor(compressedFSA);

  /*
    decompressedFSA now equals to

    {
      type: 'UPDATE',
    }
  */

```

## LICENSE

MIT
