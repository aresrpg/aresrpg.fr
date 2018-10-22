import Vue from 'vue'
import App from '@/aresrpg.vue'
import router from './router'
import Vuetify from 'vuetify'
import Vuebar from 'vuebar'

import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuebar)

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
