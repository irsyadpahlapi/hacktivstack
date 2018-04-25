<template>
  <div class="container">
    <div class="navbar">
      <div class="col-max-2 menus">
        <div class="col-max-6" v-show="!islogin">
          <button type="button" name="button" @click="show(false, true, true)">Register</button>
        </div>
        <div class="col-max-6" v-show="!islogin">
          <button type="button" name="button" @click="showlogin(false, true, true)">Login</button>
        </div>
        <div class="col-max-6" v-show="islogin">
          <button type="button" name="button" @click="logout">Logout</button>
        </div>
      </div>
    </div>
    <register/>
    <login/>
  </div>
</template>

<script>
import register from '@/components/Register.vue'
import login from '@/components/Login.vue'
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {
    register,
    login
  },
  methods: {
    show (resizable, adaptive, draggable) {
      let data = {resizable, adaptive, draggable}
      this.$store.commit('change', data)
      this.$nextTick(() => {
        this.$modal.show('registers')
      })
    },
    showlogin (resizable, adaptive, draggable) {
      let data = {resizable, adaptive, draggable}
      this.$store.commit('change', data)
      this.$nextTick(() => {
        this.$modal.show('login')
      })
    },
    logout () {
      this.$store.commit('logout')
    }
  },
  computed: mapState([
    'resizable',
    'adaptive',
    'draggable',
    'islogin'])
}
</script>
<style scoped>
  .container{
    width:100%;
  }
  .navbar{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    width:100%;
    background-color: #f18f01;
    color: white;
    padding:10px 0px;
  }
  .col-max-1 {width: 8.33%;}
  .col-max-2 {width: 16.66%;}
  .col-max-3 {width: 25%;}
  .col-max-4 {width: 33.33%;}
  .col-max-5 {width: 41.66%;}
  .col-max-6 {width: 50%;}
  .col-max-7 {width: 58.33%;}
  .col-max-8 {width: 66.66%;}
  .col-max-9 {width: 75%;}
  .col-max-10 {width: 83.33%;}
  .col-max-11 {width: 91.66%;}
  .col-max-12 {width: 100%;}

  .menus{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    background-color: #f18f01;
    color: white;
    border: 1px solid white;
    padding: 5px 10px;
  }

  @media only screen and (max-width: 768px){
    [class*="col-max"]{
      width:50%;
    }
  }
</style>
