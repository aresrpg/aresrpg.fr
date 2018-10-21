import Vue from 'vue'
import App from '@v/aresRpg.vue'
import router from './router'
import AsyncComputed from 'vue-async-computed'
import Vuetify from 'vuetify'
import Quasar from 'quasar'

import './registerServiceWorker'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/ionicons'
import 'quasar-extras/mdi'


Vue.config.productionTip = false
Vue.use(AsyncComputed)
Vue.use(Vuetify)
Vue.use(Quasar)

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
