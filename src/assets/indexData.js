const getData = (pkgName) => {
  let name = pkgName
  return `
  import ${name} from './src/${name}.vue'

  ${name}.install = (Vue) => {
    Vue.component(${name}.name, ${name})
  }

  export default ${name}
  `
}

module.exports = {
  getData
}
