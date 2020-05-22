const fs = require('fs')
const path = require('path')
const args = require('minimist')(process.argv.slice(2))
const { getData} = require('./assets/indexData')

const targetDir = args.directory || args.d
const pkgName = args.name || args.n

const absPath = path.resolve(targetDir, pkgName)

// if (fs.existsSync(absPath)) {
//   fs.rmdirSync(absPath, {
//     recursive: true
//   })
// }

fs.mkdir(absPath, err => {
  if (err) return
  fs.writeFile(path.resolve(absPath, 'index.js'), getData(pkgName))
  fs.writeFile(path.resolve(absPath, 'package.json'), getPkgData())
  fs.writeFile(path.resolve(absPath, 'README.md'), '')
  fs.mkdir(path.resolve(absPath, 'src'), err => {
    if (err) return
    fs.writeFile(path.resolve(absPath, 'src', (pkgName + '.vue')), getTemData())
  })
})


const getPkgData = () => {
  let pkgData = fs.readFileSync('./src/assets/pkg.json', {
    encoding: 'UTF-8'
  })
  pkgData = JSON.parse(pkgData)
  pkgData.name = `tz-${pkgName}`
  pkgData.keywords.push(pkgName)
  return JSON.stringify(pkgData, '', 2)
}

const getTemData = () => {
  const temData = fs.readFileSync('./src/assets/vue-template.txt', {
    encoding: 'UTF-8'
  })
  return temData
}
