<template>
  <div class="register mt-4">
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-card class="pa-4">
          <v-form
            autocomplete="off"
            @submit.prevent="validate"
          >
            <h1 class="h1">Register</h1>

            <v-text-field
              v-model="firstName"
              v-validate="'required'"
              label="First Name"
              name="firstName"
              :error-messages="errors.collect('firstName')"
            />
            <v-text-field
              v-model="lastName"
              v-validate="'required'"
              label="Last Name"
              name="lastName"
              :error-messages="errors.collect('lastName')"
            />
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
              <m-btn>Submit</m-btn>
            </div>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { register } from '@/services/api';

export default {
  name: 'register',
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
  },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll();
      if (passed) {
        this.register();
      }
    },
    async register() {
      try {
        await register(this.$data);
        this.$store.dispatch('show_modal', {
          title: 'Registration successful',
          message: 'Thank you for registering with us. Please log in to continue.'
        });
        this.$router.push('/');
      } catch (error) {
        this.errors.add({
          field: 'email',
          msg: error.response.data.message
        });
      }
    }
  }
};
</script>
