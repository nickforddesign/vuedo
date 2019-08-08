<template>
  <v-card class="pa-4">
    <v-form
      autocomplete="off"
      @submit.prevent="validate"
    >
      <v-layout pt-2>
        <v-flex grow pl-2>
          <v-text-field
            v-model="newTodo"
            v-validate="'required'"
            placeholder="What needs to be done?"
            label="New Task"
            name="task"
            :error-messages="errors.collect('task')"
          />
        </v-flex>
        <v-flex shrink>
          <v-btn
            class="mx-2"
            color="success"
            medium
            dark
            fab
            @click="validate"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <m-modal
      v-model="isModalVisible"
      :dialog="dialog"
    >
      <template slot="message">
        <v-date-picker
          v-model="date"
          full-width
        />
      </template>
    </m-modal>
  </v-card>
</template>

<script>
const DEFAULT_DATE = new Date().toISOString().substr(0, 10);

export default {
  name: 'task-form',
  data() {
    return {
      newTodo: null,
      date: DEFAULT_DATE,
      isModalVisible: false,
      dialog: {
        title: 'What is the due date?',
        cancel: true,
        accept: () => this.addTodo()
      }
    };
  },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll();
      if (passed) {
        this.isModalVisible = true;
      }
    },
    async addTodo() {
      this.$emit('create', {
        title: this.newTodo,
        date: this.date
      });
      this.newTodo = null;
      this.date = DEFAULT_DATE;
      await this.$nextTick();
      this.errors.clear();
    }
  }
};
</script>
