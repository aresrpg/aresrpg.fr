const types = {
	OPEN_MENU: 'OPEN_MENU',
	MENU_FLOATING: 'MENU_FLOATING',
}

export const state = {
	menuOpened: false,
	menuFloating: false,
}

export const mutations = {
	[types.OPEN_MENU]: (store, val) => (store.menuOpened = val),
	[types.MENU_FLOATING]: (store, val) => (store.menuFloating = val),
}

export const actions = {
	openMenu: ({ commit }, open) => commit(types.OPEN_MENU, open),
	notifyFloat: ({ commit }, open) => commit(types.MENU_FLOATING, open),
}

export const getters = {
	isMenuOpened: ({ menuOpened }) => menuOpened,
	isMenuFloating: ({ menuFloating }) => menuFloating,
}
