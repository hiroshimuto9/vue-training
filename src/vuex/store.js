import  Vue  from "vue"
import Vuex from "vuex"

// グローバルメソッドを呼び出すことによってプラグイン(vuex)を使用
Vue.use(Vuex)

// ストアの定義
const store = new Vuex.Store({
    state: {
        // タスクの初期ステート
        todos: [
            {
                id: 1,
                name: '宿題をする',
                done: false
            },
            {
                id: 2,
                name: '遊びの予定を立てる',
                done: true
            },
            {
                id: 3,
                name: 'チケットを買う',
                done: false
            },
            {
                id: 4,
                name: '掃除をする',
                done: true
            },
        ]
    }

})

export default store