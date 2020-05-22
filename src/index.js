const fs = require('fs')
const path = require('path')
const args = require('minimist')(process.argv.slice(2))

const targetDir = args.directory || args.d
const pkgName = args.name || args.n

const absPath = path.resolve(targetDir, pkgName)

let pkgData = fs.readFileSync('./src/assets/pkg.json', {
  encoding: 'UTF-8'
})
pkgData = JSON.parse(pkgData)
pkgData.name = `tz-${pkgName}`
pkgData.keywords.push(pkgName)
pkgData = JSON.stringify(pkgData, '', 2)

let temData = fs.readFileSync('./src/assets/vue-template.txt', {
  encoding: 'UTF-8'
})

fs.mkdir(absPath, err => {
  if (err) return
  fs.writeFile(path.resolve(absPath, 'index.js'), '')
  fs.writeFile(path.resolve(absPath, 'package.json'), pkgData)
  fs.writeFile(path.resolve(absPath, 'README.md'), '')
  fs.mkdir(path.resolve(absPath, 'src'), err => {
    if (err) return
    fs.writeFile(path.resolve(absPath, 'src', (pkgName + '.vue')), temData)
  })
})
