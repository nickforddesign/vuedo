<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
          <span>VUE</span>
          <span class="font-weight-thin">DOS</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <m-btn
        v-if="user"
        @click="logout"
      >
        Logout
      </m-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>

    <m-modal
      v-model="$store.state.isModalVisible"
      :dialog="dialog"
    />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters(['user', 'dialog'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>
