export default loader => [
	{
		path: '/',
		name: 'home',
		// component: () => loader('home'),
		redirect: {
			name: 'notyet',
		},
	},
	{
		path: '*',
		name: '404',
		component: () => loader('misc/404'),
	},
	{
		path: '/avant2022',
		name: 'notyet',
		component: () => loader('underConstruction'),
	},
]
