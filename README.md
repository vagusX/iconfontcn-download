# offline-iconfont

An util to help you download fonts and assets from [iconfont.cn](http://iconfont.cn/)

[![NPM version](https://img.shields.io/npm/v/@vagusx/offline-iconfont.svg?style=flat)](https://www.npmjs.com/package/offline-iconfont)
[![NPM downloads](http://img.shields.io/npm/dm/@vagusx/offline-iconfont.svg?style=flat)](https://www.npmjs.com/package/offline-iconfont)
[![CircleCI](https://circleci.com/gh/vagusx/offline-iconfont.svg?style=svg)](https://circleci.com/gh/vagusx/offline-iconfont)

## Installation

```bash
$ npm install offline-iconfont

# or use yarn
$ yarn add offline-iconfont
```

## Usage

```js
const download = require('offline-iconfont')

(async () => {
  await download({
    cssUrl: '//at.alicdn.com/t/font_1231231.css', // your iconfont.cn project url
    dir,
    extnameList: ['svg', 'eot'],
    cssOffline: false
  })
})()
```

## Options

```ts
function OfflineIconfont(config: OfflineIconfontConfig): void;

interface OfflineIconfontConfig {
  /**
   * css url from your iconfont.cn project
   */
  cssUrl: string;
  /**
   * where to locate font assets
   * @default process.cwd()
   */
  dir?: string;
  /**
   * file name for font asset
   * @default 'iconfont'
   */
  filename?: string;
  /**
   * replace font asset path to local relative path
   * @default true
   */
  cssOffline?: boolean;
  /**
   * specify which file to download
   */
  extnameList?: string[];
}
```

## Find your [iconfont.cn](http://iconfont.cn/) project url

![iconfont.cn](./assets/sample.png)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
