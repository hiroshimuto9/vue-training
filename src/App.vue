<template>
  <div id="app">
    <h2>todo一覧</h2>
    <ul>
      <!-- v-forを用いてtodoを一つずつ表示 -->
      <li v-for="todo in todos" v-bind:key="todo.id">
        <input type="checkbox" v-bind:checked="todo.done">
        {{todo.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  // 算出プロパティを定義
  computed: {
    todos() {
      return this.$store.state.todos
    },
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
