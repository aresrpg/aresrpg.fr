const types = {
	SHOW_MODAL: 'SHOW',
	CLOSING: 'CLOSE',
}

export const Modals = {
	NOT_READY_MODAL: 'NOT_READY',
}

export const state = {
	modals: {
		[Modals.NOT_READY_MODAL]: false,
	},
	closing: false,
}

export const mutations = {
	[types.SHOW_MODAL]: (store, { name, val }) => (store.modals[name] = val),
	[types.CLOSING]: (store, val) => (store.closing = val),
}

export const actions = {
	showModal: ({ commit }, payload) => commit(types.SHOW_MODAL, payload),
	closeModal: ({ commit, dispatch }) => {
		commit(types.CLOSING, true)
		setTimeout(() => {
			for (let m in Modals) dispatch('showModal', { name: Modals[m], val: false })
			commit(types.CLOSING, false)
		}, 500)
	},
}

export const getters = {
	hasNotReady: ({ modals }) => modals[Modals.NOT_READY_MODAL],
	isClosing: ({ closing }) => closing,
}
