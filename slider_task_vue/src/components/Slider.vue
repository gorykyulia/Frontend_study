<template>
  <div id="slider">
    <SliderItem v-for="user in usersDataToShow"
                :key="user.id"
                :userData="user"
    ></SliderItem>
  </div>
</template>

<script>

import SliderItem from './SliderItem.vue';
import UsersDataService from './UsersDataService'

export default {
  components: {
    SliderItem
  },
  data() {
    return {
      usersData: [],
      countSlides: 2,
      timeTurning: 2000,
      currentSlide: 0
    }
  },
  computed: {
    usersDataToShow() {
      return this.usersData.slice(this.currentSlide, this.currentSlide + this.countSlides);
    }
  },
  methods: {
    start() {
      alert('start');
      setInterval(this.changeCurrentSlide, this.timeTurning);
    },

    changeCurrentSlide() {
      this.currentSlide = (this.currentSlide === this.usersData.length - 2) ? 0 : this.currentSlide + 2;
    }
  },
  created() {
    UsersDataService.$on('dataReceived', data => {
      this.usersData = data;
      this.start();
    })
  }
}
</script>

<style scoped>
  #slider {
    display: flex;
    width: 70%;
    margin: 0 auto;
}
</style>