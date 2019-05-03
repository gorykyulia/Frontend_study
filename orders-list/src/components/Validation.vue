<template>
  <div class="container">
    <div class="form-group pt-3">
      <label for="email">Email</label>
      <input 
        type="email" id="email" 
        class="form-control"
        v-model="email"
        
        >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    }
  },
  validators: {
    email: {
      
    }
  }
};
</script>

<style>
</style>


