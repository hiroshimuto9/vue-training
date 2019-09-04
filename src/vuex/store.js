import  Vue  from "vue"
import Vuex from "vuex"
import { stat } from "fs";

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
        ],
        // 本来であればサーバー側で生成するが、ここでは決め打ち
        nextTodoId: 5,
    },
    // storeの状態の変更を処理
    mutations: {
        // todoの追加
        addTodo (state, {name}) {
            state.todos.push({
                id: state.nextTodoId,
                name,
                done: false
            })
            state.nextTodoId++
        },
        // todoの完了状態を変更
        toggleTodoStatus (state, {id}) {
            const filtered = state.todos.filter(todo => {
                return todo.id === id
            })

            filtered.forEach(todo => {
                todo.done = !todo.done
            })
        }

    },

})

export default store