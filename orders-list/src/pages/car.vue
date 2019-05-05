<template>
  <div>
    <h1>Car id {{ id }}</h1>

    <button class="btn btn-sm btn-default mb-2" @click="goToCars">Back</button>
    <br>
    <!-- <router-link 
    class="btn btn-info mt-2"
    tag="button"
    :to="'/car/' + id + '/full'"
    >Full info</router-link>-->

    <router-link
      class="btn btn-info mt-2"
      tag="button"
      :to="{name: 'carFull', params: { id: id }}"
    >Full info</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // id: this.$router.currentRoute.params['id']
      id: this.$route.params["id"]
    };
  },
  methods: {
    goToCars() {
      this.$router.push("/cars");
    }
  },
  watch: {
    $route(toR, fromR) {
      this.id = toR.params["id"];
    }
  }
};
</script>

<style>
</style>
