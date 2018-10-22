import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@v/${view}.vue`)
}

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: {
				name: 'notyet',
			},
			// component: loadView('home'),
		},
		{
			path: '/avant2022',
			name: 'notyet',
			component: loadView('notYet'),
		},
		{
			path: '*',
			name: '404',
			component: loadView('notFound'),
		},
	],
})
