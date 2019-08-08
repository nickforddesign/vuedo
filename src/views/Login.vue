<template>
  <div class="login mt-4">
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-card class="pa-4">
          <v-form
            autocomplete="off"
            @submit.prevent="validate"
          >
            <h1 class="h1">Login</h1>

            <v-text-field
              v-model="email"
              v-validate="'required|email'"
              label="Email"
              name="email"
              :error-messages="errors.collect('email')"
            />

            <v-text-field
              v-model="password"
              v-validate="'required'"
              label="Password"
              name="password"
              type="password"
              :error-messages="errors.collect('password')"
            />
            <div class="actions mt-4">
              <m-btn class="mr-3">Submit</m-btn>
              <m-btn
                type="button"
                color="secondary"
                @click="register"
              >
                Register
              </m-btn>
            </div>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { login } from '@/services/api';
import { setLocalStorage } from '@/utils';

export default {
  name: 'login',
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll();
      if (passed) {
        this.login();
      }
    },
    async login() {
      try {
        const { user: { token } } = await login(this.$data);
        setLocalStorage('token', token);
        this.$router.push('/todos');
      } catch (error) {
        this.errors.add({
          field: 'password',
          msg: 'Invalid credentials'
        });
      }
    },
    register() {
      this.$router.push('/register');
    }
  }
};
</script>
