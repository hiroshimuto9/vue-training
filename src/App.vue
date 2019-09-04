<template>
  <div id="app">
    <h2>todo一覧</h2>
    <ul>
      <!-- v-forを用いてtodoを一つずつ表示 -->
      <li v-for="todo in todos" v-bind:key="todo.id">
        <input type="checkbox" v-bind:checked="todo.done"
        v-on:change="toggleTodoStatus(todo)">
        {{todo.name}}
      </li>
    </ul>

    <form v-on:submit.prevent="addTodo">
      <input type="text" v-model="newTodoName" placeholder="新しいtodo">
    </form>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data() {
    return {
      // 入力中の新しいtodo名を一時的に保持
      newTodo: '',
    }
  },
  // 算出プロパティを定義
  computed: {
    todos() {
      return this.$store.state.todos
    },
  },
  // template内で使用されるmethodを定義
  methods: {
    //　新規作成
    addTodo() {
      // store.jsのaddTodoミューテーションにコミット
      this.$store.commit('addTodo', {
        name: this.newTodo,
      })
      this.newTodo = ''
    },

    // todoの完了状態を更新
    toggleTodoStatus(todo) {
      // store.jsのtoggleTodoStatusミューテーションにコミット
      this.$store.commit('toggleTodoStatus', {
        id: todo.id
      })
    }

  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
