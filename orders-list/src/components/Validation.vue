<template>
  <div class="container">
    <form class="pt-3" @submit.prevent="onSubmit">
      <div class="form-group pt-3">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          :class="{'is-invalid':$v.email.$error}"
          v-model="email"
          @blur="$v.email.$touch()"
        >
        <div v-if="!$v.email.required" class="invalid-feedback">Email field is required</div>
        <div v-if="!$v.email.email" class="invalid-feedback">This field should be an email</div>
        <div v-if="!$v.email.uniqueEmail" class="invalid-feedback">Unique email</div>
      </div>
      <div class="form-group pt-3">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          :class="{'is-invalid':$v.password.$error}"
          v-model="password"
          @blur="$v.password.$touch()"
        >
        <div
          v-if="!$v.password.minLength"
          class="invalid-feedback"
        >Min length of password is {{ $v.password.$params.minLength.min }}. Now is {{ password.length }}</div>
      </div>
      <div class="form-group pt-3">
        <label for="confirmPassword">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          class="form-control"
          :class="{'is-invalid':$v.confirmPassword.$error}"
          v-model="confirmPassword"
          @blur="$v.confirmPassword.$touch()"
        >
        <div v-if="!$v.confirmPassword.sameAs" class="invalid-feedback">Password should match</div>
      </div>
      <button class="btn btn-success" type="submit" :disabled="$v.$invalid">Submit</button>
      <pre>
        {{ $v }}
      </pre>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    onSubmit() {}
  },
  validations: {
    email: {
      required,
      email,
      uniqueEmail: function(newEmail) {
        if (newEmail === "") return true;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const value = newEmail !== "test@mail.ru";
            resolve(value);
          }, 1000);
        });
      }
    },
    password: {
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs("password")
    }
  }
};
</script>

<style>
</style>


