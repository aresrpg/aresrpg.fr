const types = {
	OPEN_MENU: 'OPEN_MENU',
	MENU_FLOATING: 'MENU_FLOATING',
	MENU_ANIMATION: 'MENU_ANIM',
}

export const state = {
	menuOpened: false,
	menuFloating: false,
	menuAnimating: false,
}

export const mutations = {
	[types.OPEN_MENU]: (store, val) => (store.menuOpened = val),
	[types.MENU_FLOATING]: (store, val) => (store.menuFloating = val),
	[types.MENU_ANIMATION]: (store, val) => (store.menuAnimating = val),
}

export const actions = {
	openMenu: ({ commit }, val) => commit(types.OPEN_MENU, val),
	notifyFloat: ({ commit }, val) => commit(types.MENU_FLOATING, val),
	notifyAnimating: ({ commit }, val) => commit(types.MENU_ANIMATION, val),
}

export const getters = {
	isMenuOpened: ({ menuOpened }) => menuOpened,
	isMenuFloating: ({ menuFloating }) => menuFloating,
	isMenuAnimating: ({ menuAnimating }) => menuAnimating,
}
