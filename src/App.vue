<template>
  <div id="app">
    <h2>todo一覧</h2>
    <ul>
      <!-- v-forを用いてtodoを一つずつ表示 -->
      <li v-for="todo in todos" v-bind:key="todo.id">
        <input type="checkbox" v-bind:checked="todo.done"
        v-on:change="toggleTodoStatus(todo)">
        {{todo.name}}
        -
        <span v-for="id in todo.labelIds" v-bind:key="id">
          {{getLabelText(id)}}
        </span>
      </li>
    </ul>

    <form v-on:submit.prevent="addTodo">
      <input type="text" v-model="newTodoName" placeholder="新しいtodo">
    </form>

    <h2>ラベル一覧</h2>
    <ul>
      <!-- v-forを用いてlabelを一つずつ表示 -->
      <li v-for="label in labels" v-bind:key="label.id">
        <input type="checkbox" v-bind:value="label.id"
        v-model="newTodoLabelIds">
        {{label.text}}
      </li>
    </ul>
    <form v-on:submit.prevent="addLabel">
      <input type="text" v-model="newLabelText" placeholder="新しいラベル">
    </form>

    <h2>ラベルでフィルタ</h2>
    <ul>
      <!-- v-forを用いてlabelを一つずつ表示 -->
      <li v-for="label in labels" v-bind:key="label.id">
        <input type="radio" v-bind:checked="label.id === filter"
        v-on:change="changeFilter(label.id)">
        {{label.text}}
      </li>
      <li>
        <input type="radio" v-bind:checked="filter === null"
        v-on:change="changeFilter(null)">
        フィルタしない
      </li>
    </ul>

    <h2>保存と復元</h2>
    <button type="button" v-on:click="save">保存</button>
    <button type="button" v-on:click="restore">復元</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      // 入力中の新しいtodo名を一時的に保持
      newTodoName: '',
      // 入力中の新しいtodoに紐づくlabelを一時的に保持
      newTodoLabelIds: [],
      // 入力中の新しいlabelを一時的に保持
      newLabelText: '',
    }
  },
  // 算出プロパティを定義
  computed: {
    todos() {
      return this.$store.getters.filteredTodos
    },
    labels() {
      return this.$store.state.labels
    },
    filter() {
      return this.$store.state.filter
    }
  },
  // template内で使用されるmethodを定義
  methods: {
    // 新規作成
    addTodo() {
      // store.jsのaddTodoミューテーションにコミット
      this.$store.commit('addTodo', {
        name: this.newTodoName,
        labelIds: this.newTodoLabelIds,
      })
      this.newTodoName = ''
      this.newTodoLabelIds= []
    },

    // todoの完了状態を更新
    toggleTodoStatus(todo) {
      // store.jsのtoggleTodoStatusミューテーションにコミット
      this.$store.commit('toggleTodoStatus', {
        id: todo.id
      })
    },

    // ラベルの追加
    addLabel() {
      // store.jsのaddLabelミューテーションにコミット
      this.$store.commit('addLabel', {
        text: this.newLabelText
      })
      this.newLabelText= ''
    },

    // ラベルのIDからそのラベルのテキストを返しtemplate内に表示
    getLabelText(id) {
      const label = this.labels.filter(label => label.id === id)[0]
      return label ? label.text : ''
    },

    // フィルタする対象のラベルを変更
    changeFilter(labelId) {
      // store.jsのchangeFilterミューテーションにコミット
      this.$store.commit('changeFilter', {
        filter: labelId
      })
    },

    // 現在の状態をローカルストレージに保存
    save() {
      // store.jsのsaveアクションにコミット
      this.$store.dispatch('save')
    },

    // 保存されている状態を復元
    restore() {
      // store.jsのrestoreアクションにコミット
      this.$store.dispatch('restore')
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
