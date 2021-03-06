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
                labelIds: [1, 2],
                done: false
            },
            {
                id: 2,
                name: '遊びの予定を立てる',
                labelIds: [1, 3],
                done: true
            },
            {
                id: 3,
                name: 'チケットを買う',
                labelIds: [2, 3],
                done: false
            },
            {
                id: 4,
                name: '掃除をする',
                labelIds: [2, 4],
                done: true
            },
        ],
        // ラベルの初期ステート
        labels: [
            {
                id: 1,
                text: '勉強'
            },
            {
                id: 2,
                text: '遊び'
            },
            {
                id: 3,
                text: '買い物'
            },
            {
                id: 4,
                text: '家事'
            },
        ],
        // 本来であればサーバー側で生成するが、ここでは決め打ち
        nextTodoId: 5,
        nextLabelId: 5,

        // フィルタするラベルのID
        filter: null,
    },

    getters: {
        // フィルタ後のタスクを返す
        filteredTodos (state) {
            // ラベルが選択されていなければ一覧を返す
            if (!state.filter) {
                return state.todos
            }
            return state.todos.filter(todo => {
                return todo.labelIds.indexOf(state.filter) >= 0
            })
        }
    },
    // storeの状態の変更を処理
    mutations: {
        // todoの追加
        addTodo (state, {name, labelIds}) {
            state.todos.push({
                id: state.nextTodoId,
                name,
                labelIds,
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
        },
        // labelの追加
        addLabel (state, {text}) {
            state.labels.push({
                id: state.nextLabelId,
                text
            })
            state.nextLabelId++
        },
        // フィルタリング対象のラベルを変更
        changeFilter (state, {filter}) {
            state.filter = filter
        },
        // ステートの復元
        restore(state, {todos, labels, nextTodoId, nextLabelId}) {
            state.todos = todos
            state.labels = labels
            state.nextTodoId = nextTodoId
            state.nextLabelId = nextLabelId
        }
    },
    // ミューテーションへのコミットの役割
    actions: {
        // ローカルストレージにステートを保存する
        save ({state}) {
            const data = {
                todos: state.todos,
                labels: state.labels,
                nextTodoId: state.nextTodoId,
                nextLabelId: state.nextLabelId
            }
            localStorage.setItem('todo-app-data', JSON.stringify(data))
        },
        // ローカルストレージからステートを復元
        restore ({commit}) {
            const data = localStorage.getItem('todo-app-data')
            if (data) {
                commit('restore', JSON.parse(data))
            }
        }
    },
})

export default store