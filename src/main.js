import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'


new Vue({
  el: '#app',

  // コンポーネントからstoreの利用を可能にする
  store,
  render: h => h(App),
}).$mount('#app')
