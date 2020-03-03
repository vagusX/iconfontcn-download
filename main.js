const fs = require('fs')
const path = require('path')
const stream = require('stream')
const { promisify } = require('util')

const got = require('got')
const ora = require('ora')

const iconFontCNCssRegex = /\/\/at\.alicdn\.com\/t\/font\w+\.css/i

// eslint-disable-next-line node/no-deprecated-api
const fsExists = promisify(fs.exists)
const fsReadFile = promisify(fs.readFile)
const fsWriteFile = promisify(fs.writeFile)
const fsMkdir = promisify(fs.mkdir)
const streamPipeline = promisify(stream.pipeline)

const extnameList = ['css', 'eot', 'woff', 'woff2', 'ttf', 'svg']

// 默认的 iconfont.cn 下载下来的 css 中包含的是字体文件的在线地址
// 需要转换成本地字体文件地址
async function offlineCss(config) {
  const { cssUrl, targetDir, filename } = config
  const downloadUrlPrefix = cssUrl.replace(/.css$/g, '')

  const cssFilePath = path.join(targetDir, filename + '.css')

  if (!(await fsExists(targetDir))) {
    throw new Error('🚔 Cannot found the css file:' + targetDir)
  }

  const spinner = ora('🚀 Starting to offline css file').start()
  const cssFileContent = await fsReadFile(cssFilePath, { encoding: 'utf8' })
  const updatedCssFileContent = cssFileContent.replace(
    new RegExp(downloadUrlPrefix, 'g'),
    filename
  )
  await fsWriteFile(cssFilePath, updatedCssFileContent, { encoding: 'utf8' })
  spinner.succeed('💪 Finish')
}

async function download(config) {
  const {
    cssUrl,
    targetDir = process.cwd(),
    filename = 'iconfont',
    offline = true
  } = config
  if (!iconFontCNCssRegex.test(cssUrl)) {
    throw new Error('🚔 Invalid iconfont.cn css url' + cssUrl)
  }

  if (!(await fsExists(targetDir))) {
    console.warn('🐛 Invalid target dir' + targetDir)
    await fsMkdir(targetDir, { recursive: true })
    console.log('🚀 Created this dir:', targetDir)
  }

  const downloadUrlPrefix = cssUrl.replace(/.css$/g, '')

  const spinner = ora('🚀 Starting to download files from iconfont.cn').start()
  await Promise.all(
    extnameList.map(extname => {
      const downloadUrl = `${downloadUrlPrefix}.${extname}`
      return streamPipeline(
        got.stream('http:' + downloadUrl),
        fs.createWriteStream(path.join(targetDir, `${filename}.${extname}`))
      )
    })
  )

  spinner.succeed('💪 Finish downloading')

  if (offline) {
    offlineCss({ cssUrl, targetDir, filename })
  }
}

module.exports = download
