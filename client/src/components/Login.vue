<template>
  <modal name="login"
    transition="nice-modal-fade"
    :min-width="200"
    :min-height="200"
    :delay="100"
    width="400"
    height="250"
    :adaptive="adaptive"
    :resizable="resizable"
    :draggable="draggable">
     <div class="example-modal-content" style="color:black; border-radius:5px;">
       <div class="row" style="padding:10px;">
         <div class="col-max-12" align="center">
           <div style="padding:5px">
             <span style="font-size:30px;">Login</span>
             <hr style="margin-bottom:20px;">
             <input type="text" name="" value="" v-model="email" placeholder="input your email" style="width:90%; padding:3%; margin-bottom:10px; border-radius:3px; border:1px solid #aaa; text-align:center;">
             <input type="password" name="" value="" v-model="password" placeholder="input your password" style="width:90%; padding:3%; margin-bottom:10px; border-radius:3px; border:1px solid #aaa; text-align:center;">
             <button type="button" class="btnregister" style="margin-top:10px;" @click="login">Log in</button>
           </div>
         </div>
       </div>
     </div>
   </modal>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log('masuk login')
      axios.post('http://localhost:3000/users/signin', {
        email: this.email,
        password: this.password
      }).then(response => {
        this.$store.commit('token', {token: response.data.token})
        this.$modal.hide('login')
      })
    }
  },
  computed: mapState([
    'resizable',
    'adaptive',
    'draggable'])
}
</script>

<style scoped>
.container{
  padding:0px 20px;
}
.row {
  display : flex;
  flex-wrap:wrap;
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

.bg {
  height:400px;;
  background-image: url('../assets/register.jpg');
  background-size: cover;
}

.btnregister {
  padding:8px 0px;
  width:100%;
  background-color: transparent;
  box-shadow: 0px 0px black;
  border: 1px solid grey;
}
button:focus{
  background-color: black;
  color: white;
  transition-duration:0.8s;
}
@media only screen and (max-width: 768px){
  [class*="col-max-6"]{
    width:100%;
  }
  .bg {
    width:0;
  }
}
</style>
