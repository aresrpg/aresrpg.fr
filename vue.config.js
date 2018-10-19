const path = require('path')

const aliases = {
	sc: 'src/lib_temp',
	sc_stl: 'src/lib_temp/stylus',
	sc_cmp: 'src/lib_temp/comps',
	cmp: 'src/comps',
	stl: 'src/stylus',
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
}
