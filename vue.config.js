const path = require('path')

const aliases = {
	h: 'src/hydre',
	cmp: 'src/comps',
	stl: 'src/styles',
	v: 'src/views',
	core: 'src/core',
	rs: 'src/assets/resources',
	svg: 'src/assets/svg',
}

const registerAliases = (a, config) => Object.entries(a).forEach(([k, v]) => config.resolve.alias.set('@' + k, path.join(__dirname, v)))
const svgLoader = config => {
	const svgRule = config.module.rule('svg')
	svgRule.uses.clear()
	svgRule.use('vue-svg-loader').loader('vue-svg-loader')
}

module.exports = {
    chainWebpack: config => {
		registerAliases(aliases, config)
		svgLoader(config)
	},
    pluginOptions: {
      quasar: {
        theme: 'mat',
        rtlSupport: true,
        importAll: true
      }
    },
    transpileDependencies: [
      /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/
    ]
}
