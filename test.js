const os = require('os')
const path = require('path')
const fs = require('fs')

const download = require('./main')

describe('test case for iconfontcn-download', () => {
  it('fixtures #1', async () => {
    const dir = path.join(os.tmpdir(), 'font')
    const filename = 'iconfont-test'
    const urlPrefix = '//at.alicdn.com/t/font_1669148_hw2if5r0m5e'
    await download({
      cssUrl: `${urlPrefix}.css`,
      filename,
      dir
    })

    const cssFilePath = path.join(dir, filename + '.css')
    const content = fs.readFileSync(cssFilePath, { encoding: 'utf8' })
    expect(content).not.toContain(urlPrefix)

    const extnameList = ['css', 'eot', 'woff', 'woff2', 'ttf', 'svg']

    extnameList.forEach(extname => {
      expect(
        fs.existsSync(path.join(dir, `${filename}.${extname}`))
      ).toBeTruthy()
    })
  })

  it('fixtures #2', async () => {
    const dir = path.join(os.tmpdir(), 'font')
    const urlPrefix = '//at.alicdn.com/t/a/font_1432262_0gpk8o1jvjfn'
    await download({
      cssUrl: `${urlPrefix}.css`,
      dir,
      extnameList: ['css', 'svg'],
      cssOffline: false
    })

    const cssFilePath = path.join(dir, 'iconfont.css')
    const content = fs.readFileSync(cssFilePath, { encoding: 'utf8' })
    expect(content).toContain(urlPrefix)

    const extnameList = ['css', 'svg']

    extnameList.forEach(extname => {
      expect(fs.existsSync(path.join(dir, `iconfont.${extname}`))).toBeTruthy()
    })
  })

  it('fixtures #3', async () => {
    const dir = path.join(os.tmpdir(), 'font')
    const urlPrefix = '//at.alicdn.com/t/a/font_1432262_0gpk8o1jvjfn'
    await download({
      cssUrl: `${urlPrefix}.css`,
      dir,
      extnameList: ['svg', 'eot'],
      cssOffline: false
    })

    const extnameList = ['svg', 'eot']
    extnameList.forEach(extname => {
      expect(fs.existsSync(path.join(dir, `iconfont.${extname}`))).toBeTruthy()
    })
  })
})
