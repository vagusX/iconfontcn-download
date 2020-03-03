const os = require('os')
const path = require('path')
const fs = require('fs')

const download = require('./main')

describe('test case for iconfontcn-download', () => {
  it('fixture test', async () => {
    const targetDir = path.join(os.tmpdir(), 'font')
    const filename = 'iconfont-test'
    const urlPrefix = '//at.alicdn.com/t/font_1669148_hw2if5r0m5e'
    await download({
      cssUrl: `${urlPrefix}.css`,
      filename,
      targetDir,
      offline: true
    })

    const cssFilePath = fs.existsSync(path.join(targetDir, filename + '.css'))
    expect(cssFilePath).toBeTruthy()
    const content = fs.readFileSync(cssFilePath, { encoding: true })
    expect(content).not.toContain(urlPrefix)

    const extnameList = ['css', 'eot', 'woff', 'woff2', 'ttf', 'svg']

    extnameList.forEach(extname => {
      expect(
        fs.existsSync(path.join(targetDir, `${filename}.${extname}`))
      ).toBeTruthy()
    })
  })
})
