export const applyAttributes = {
	bind: (el, { modifiers }) => {
		for (let mod in modifiers) el[mod] = true
	},
}
