<template v-if="data">
  <v-card
    class="pa-4"
  >
    <v-layout>
      <v-flex shrink>
        <v-btn
          class="mx-2"
          fab
          :medium="$vuetify.breakpoint.smAndUp"
          :small="$vuetify.breakpoint.xsOnly"
          :color="data.done ? 'success' : 'lightgrey'"
          :class="editing && 'disabled'"
          @click="toggleDone"
        >
          <v-icon dark @click.prevent>check</v-icon>
        </v-btn>
      </v-flex>
      <v-flex grow pl-2>
        <div v-if="!editing">
          <h2>{{ data.title }}</h2>
          <h3>{{ data.date }}</h3>
        </div>
        <v-form v-else @submit.prevent="validate">
          <v-layout>
            <v-flex xs8>
              <v-text-field
                v-model="newTitle"
                v-validate="'required'"
                placeholder="What needs to be done?"
                name="title"
                :error-messages="errors.collect('title')"
              />
            </v-flex>
            <v-flex xs4 pl-3>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="newDate"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="newDate"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="newDate" no-title scrollable>
                  <v-spacer />
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(newDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
      <v-flex shrink>
        <v-btn
          v-if="!editing"
          class="mx-2"
          color="warning"
          :medium="$vuetify.breakpoint.smAndUp"
          :small="$vuetify.breakpoint.xsOnly"
          dark
          fab
          @click="edit"
        >
          <v-icon dark>edit</v-icon>
        </v-btn>
        <v-btn
          v-else
          class="mx-2"
          color="blue"
          :medium="$vuetify.breakpoint.smAndUp"
          :small="$vuetify.breakpoint.xsOnly"
          dark
          fab
          @click="validate"
        >
          <v-icon dark>save</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          color="error"
          :medium="$vuetify.breakpoint.smAndUp"
          :small="$vuetify.breakpoint.xsOnly"
          dark
          fab
          @click="remove"
        >
          <v-icon dark>remove</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'todo',
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newTitle: this.data.title,
      newDate: this.data.date,
      editing: false,
      menu: false
    };
  },
  mounted() { console.log(this); },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll();
      if (passed) {
        this.save();
      }
    },
    edit() {
      this.editing = true;
    },
    remove() {
      this.$emit('remove', this.data.id);
    },
    save(data = null) {
      this.$emit('edit', {
        ...this.data,
        ...data,
        title: this.newTitle,
        date: this.newDate
      });
      this.editing = false;
    },
    toggleDone() {
      this.save({
        done: !this.data.done
      });
    }
  }
};
</script>

<style scoped lang="scss">
.disabled {
  pointer-events: none;
  opacity: 0.4;
}
::v-deep .v-text-field {
  margin-top: 0 !important;
  padding-top: 2px !important;
}
</style>
