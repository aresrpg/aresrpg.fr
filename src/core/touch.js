export function touchListen(start, move, end) {
	window.addEventListener('touchstart', start)
	window.addEventListener('touchmove', move)
	window.addEventListener('touchend', end)
}

export function touchRemove(start, move, end) {
	window.removeEventListener('touchstart', start)
	window.removeEventListener('touchmove', move)
	window.removeEventListener('touchend', end)
}
