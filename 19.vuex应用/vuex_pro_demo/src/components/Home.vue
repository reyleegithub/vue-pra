<template>
  <div class="h-box">
    <top-header></top-header>
    <!-- <div class="h-content">
      <button @click="goTologout">下一个页面</button>
    </div>
    <button @click="shows">展示弹框</button>
    <alert :show="show" @hide="hide"></alert>
    <brother></brother>
    <sister></sister> -->
  </div>
</template>

<script>

  'use strict'

  import TopHeader from './top-header.vue'
  import Brother from './brother.vue'
  import Sister from './sister.vue'
  import Alert from './childvue/alert.vue'


  export default {
    name: "Home",
    data() {
      return {
        show: false,
        timer: ''
      }
    },
    mounted() {
      this.timer = setTimeout(()=>{
        console.log(this.clearTimeout)
        clearTimeout(this.timer)
      },1000);
    },
    methods: {
      goTologout() {
        this.$router.push('/two');
      },
      shows() {
        this.show = true
      },
      hide() {
        this.show = false;
      }
    },
    components: {
      TopHeader,
      alert: Alert,
      Brother,
      Sister
    },
  }
</script>

<style scoped>



  .h-content {
    margin-top: 64px;
  }

  /*.header-title {*/
  /*  color: white;*/
  /*  font-size: 20px;*/
  /*}*/

</style>
