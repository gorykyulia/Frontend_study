<template>
  <div class="slider__item">
    <div class="slider__userLogin">{{ userData.login }}</div>
    <div class="slider__userAvatar">
      <img :src="userData.avatar_url" alt="This is a photo"> 
    </div>
    <div class="slider__userPage">{{userData.html_url}}</div>
  </div>
  
</template>

<script>

  export default {
    props: {
      userData: Object
    }
  }

</script>

<style scoped>
  .slider__item {
    width: 50%;   
  }

  .slider__userLogin,
  .slider__userPage {
    color: blue;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }

  .slider__item img {
    width: 100%;
  }
</style>