<template>
  <v-layout v-if="todos" justify-center>
    <v-flex xs12 sm9>
      <div class="my-4">
        <h2 class="display-1 mb-3 font-weight-light">
          Hello {{ user.firstName }}! What do you have to do?
        </h2>
      </div>

      <task-form
        @create="createTodo"
      />

      <div class="mt-3 mb-4">
        <code>You currently have {{ tasksCount }}.</code>
      </div>

      <div v-if="todos">
        <todo
          v-for="todo in todos"
          :key="todo.id"
          :data="todo"
          class="mt-4"
          @remove="removeTodo"
          @edit="editTodo"
        />
      </div>
      <m-loading v-else />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { refresh } from '@/services/api';
import TaskForm from '@/components/TaskForm';
import Todo from '@/components/Todo';

export default {
  name: 'todos',
  components: { TaskForm, Todo },
  computed: {
    tasksCount() {
      const count = this.todos.length;
      let message = `${count} task`;
      if (count > 1 || !count) message += 's';
      return message;
    },
    ...mapGetters(['user', 'todos'])
  },
  async mounted() {
    try {
      await this.refreshSession();
      await this.fetchTodos();
    } catch (error) {
      this.logout();
    }
  },
  methods: {
    fetchTodos() {
      this.$store.dispatch('get_todos', this.user.id);
    },
    createTodo({ title, date }) {
      this.$store.dispatch('add_todo', {
        user: this.user.id,
        title,
        date
      });
    },
    removeTodo(id) {
      this.$store.dispatch('remove_todo', id);
    },
    editTodo(todo) {
      this.$store.dispatch('edit_todo', todo);
    },
    async refreshSession() {
      const { user } = await refresh();
      this.$store.dispatch('set_user', user);
    }
  }
};
</script>
