import Vue from 'vue';
import Vuex from 'vuex';
import { removeLocalStorage } from '@/utils';
import {
  getTodos,
  addTodo,
  editTodo,
  removeTodo
} from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    todos: null,
    dialog: null,
    isModalVisible: false
  },
  getters: {
    user: ({ user }) => user,
    todos: ({ todos }) => todos,
    dialog: ({ dialog }) => dialog,
    isModalVisible: ({ isModalVisible }) => isModalVisible
  },
  mutations: {
    LOGOUT(state) {
      state.todos = null;
      state.user = null;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    SHOW_MODAL(state, dialog) {
      state.dialog = dialog;
      state.isModalVisible = true;
    }
  },
  actions: {
    logout({ commit }) {
      removeLocalStorage('token');
      commit('LOGOUT');
    },
    set_user({ commit }, user) {
      commit('SET_USER', user);
    },
    async get_todos({ commit }, user) {
      const todos = await getTodos(user);
      commit('SET_TODOS', todos);
    },
    async add_todo({ commit }, data) {
      const { todo } = await addTodo(data);
      commit('ADD_TODO', todo);
    },
    async edit_todo({ dispatch }, todo) {
      await editTodo(todo);
      dispatch('get_todos', this.state.user.id);
    },
    async remove_todo({ dispatch }, id) {
      await removeTodo(id);
      dispatch('get_todos', this.state.user.id);
    },
    show_modal({ commit }, dialog) {
      commit('SHOW_MODAL', dialog);
    }
  }
});
