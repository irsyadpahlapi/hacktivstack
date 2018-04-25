<template>
  <div class="home">
    <div class="container">
      <i class="fas fa-plus-circle addquestion" @click="btnaddquestion(false,false,false)" v-show="islogin"></i>
      <h2>Question</h2>
      <hr>
        <div class="row" v-for="(n, i) in showquestion" :key="i">
          <div class="col-max-3">
            <div class="col-max-4 boxvote">
              <div class="item">
                <div class="votes">
                  {{n.vote}}
                </div>
                <div style="text-align:center">
                  votes
                </div>
              </div>
            </div>
            <div class="col-max-4 boxvote">
              <div class="item">
                <div class="votes">
                  {{n.answer.length}}
                </div>
                <div style="text-align:center">
                  answers
                </div>
              </div>
            </div>
            <div class="col-max-4 boxvote">
              <div class="item">
                <div class="votes">
                  {{n.views}}
                </div>
                <div style="text-align:center">
                  views
                </div>
              </div>
            </div>
          </div>
          <div class="col-max-8">
            <div class="col-max-12 title">
              <router-link :to="{ name: 'detail', params: {id:n._id}}" style="color:black; text-decoration:none;" class="container">
                <h3> {{n.question}} </h3>
              </router-link>
            </div>
            <div class="col-max-12 tag">
              <div class="tagbox" v-for="(tagquestion, j) in n.tag" :key="j">
                {{tagquestion}}
              </div>
            </div>
          </div>
          <div class="col-max-1">
            <div class="row" style="border:none;">
              <div style="margin-right:5px;">
                <button type="button" name="button" @click="deletequestion(n._id)" v-show="islogin"><i class="fas fa-trash-alt"></i></button>
              </div>
              <div class="">
                <button type="button" name="button" @click="updatequestion(false,false,false,n)" v-show="islogin"><i class="fas fa-pencil-alt"></i></button>
              </div>
            </div>
          </div>
      </div>
    </div>
    <modal name="btnaddquestion"
      transition="nice-modal-fade"
      :min-width="200"
      :min-height="200"
      :delay="100"
      width="80%"
      height="90%"
      :adaptive="adaptive"
      :resizable="resizable"
      :draggable="draggable">
       <div class="example-modal-content" style="color:black; border-radius:5px;overflow-y:scroll; height:100%; width:100%; position:absolute; right:-30px; ">
         <div class="row" style="padding:10px;">
           <div class="col-max-12" align="center">
             <div style="padding:5px ">
               <span style="font-size:30px;">Add Question</span>
               <div class="addbox" style="width:70%; margin:auto;">
                 <div class="col-max-12" style="margin-bottom:10px;">
                   <label for="question" class="col-max-12" style="text-align:left;">Your Question</label>
                   <input type="text" name="" v-model="addtitle" class="col-max-12 input" id="question" placeholder="input your question">
                 </div>
                 <div class="col-max-12" style="margin-bottom:10px;">
                   <vue-editor style="width:100%;" v-model="addcode" placeholder="your code"></vue-editor>
                 </div>
                 <div class="col-max-12">
                   <label for="tag" class="col-max-12" style="text-align:left;">tag</label>
                   <textarea name="name" class="col-max-12 input" v-model="addtag" id="tag" placeholder="your tag without space"></textarea>
                 </div>
                 <div class="col-max-12" align="left">
                   <button type="button" name="button" @click="addquestion">Add Question</button>
                 </div>
               </div>

             </div>
           </div>
         </div>
       </div>
     </modal>
     <modal name="btnupdate"
       transition="nice-modal-fade"
       :min-width="200"
       :min-height="200"
       :delay="100"
       width="80%"
       height="90%"
       :adaptive="adaptive"
       :resizable="resizable"
       :draggable="draggable">
        <div class="example-modal-content" style="color:black; border-radius:5px;overflow-y:scroll; height:100%; width:100%; position:absolute; right:-30px; ">
          <div class="row" style="padding:10px;">
            <div class="col-max-12" align="center">
              <div style="padding:5px ">
                <span style="font-size:30px;">Update Question</span>
                <div class="addbox" style="width:70%; margin:auto;">
                  <div class="col-max-12" style="margin-bottom:10px;">
                    <label for="question" class="col-max-12" style="text-align:left;">Your Question</label>
                    <input type="text" name="" v-model="updatetitle" class="col-max-12 input" id="question" placeholder="input your question">
                  </div>
                  <div class="col-max-12" style="margin-bottom:10px;">
                    <vue-editor style="width:100%;" v-model="updatecode" placeholder="your code"></vue-editor>
                  </div>
                  <div class="col-max-12">
                    <label for="tag" class="col-max-12" style="text-align:left;">tag</label>
                    <textarea name="name" class="col-max-12 input" v-model="updatetag" id="tag" placeholder="your tag without space"></textarea>
                  </div>
                  <div class="col-max-12" align="left">
                    <button type="button" name="button" @click="updatequestions">Add Question</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      addtitle: '',
      addcode: '',
      addtag: '',
      updateid: '',
      updatetitle: '',
      updatecode: '',
      updatetag: '',
      showquestion: []
    }
  },
  created: function () {
    this.showquestions()
  },
  methods: {
    showquestions () {
      axios.get('http://localhost:3000/showquestion').then(response => {
        this.showquestion = response.data.data
      })
    },
    btnaddquestion (resizable, adaptive, draggable) {
      let data = { resizable, adaptive, draggable }
      this.$store.commit('change', data)
      this.$nextTick(() => {
        this.$modal.show('btnaddquestion')
      })
    },
    addquestion () {
      let tags = this.addtag.split('#').slice(1)
      axios.post('http://localhost:3000/addquestion', {
        question: this.addtitle,
        code: this.addcode,
        tag: tags
      }).then(response => {
        console.log(response)
        this.$modal.hide('btnaddquestion')
        this.showquestions()
      })
    },
    deletequestion (id) {
      axios.delete(`http://localhost:3000/${id}`).then(response => {
        this.showquestions()
      })
    },
    updatequestion (resizable, adaptive, draggable, data) {
      let datas = { resizable, adaptive, draggable }
      this.$store.commit('change', datas)
      this.$nextTick(() => {
        this.$modal.show('btnupdate')
      })
      this.updateid = data._id
      this.updatetitle = data.question
      this.updatecode = data.code
      this.updatetag = '#' + data.tag.join('#')
    },
    updatequestions () {
      let tagsupdate = this.updatetag.split('#').slice(1)
      axios.put(`http://localhost:3000/${this.updateid}`, {
        question: this.updatetitle,
        code: this.updatecode,
        tag: tagsupdate
      }).then(response => {
        console.log(response)
        this.showquestions()
        this.$modal.hide('btnupdate')
      })
    }
  },
  components: {
    VueEditor
  },
  computed: mapState([
    'resizable',
    'adaptive',
    'draggable',
    'islogin'])
}
</script>

<style scoped>
button{
  background-color:transparent;
  border:1px solid grey;
  padding:10px;
  margin:20px 0px;
}
button:hover{
  background-color: black;
  border:1px solid white;
  color:white;
}
.container{
  padding:0px 20px;
}
.row {
  display : flex;
  flex-wrap:wrap;
  border-bottom:1px solid rgba(100,100,100,0.125);
}
.input{
  border-radius: 5px;
}
.item{
  padding: 10px;
  background-color: transparent;
  box-shadow: 0px 0px 5px grey inset;
  border-radius: 2px;
  justify-content: center;
}
.boxvote{
  display : flex;
  justify-content: center;
  align-items:center;
  height:100%;
}
.votes{
  display : flex;
  justify-content: center;
  align-items:center;
  height:100%;
}
.tag{
  display: flex;
  flex-wrap: wrap;
}
.tagbox{
  margin:4px 3px;
  padding:5px 7px;
  color:#39739d;
  background-color: #E1ECF4;
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

[class*="col-max"]{
  float:left;
}

.addquestion{
  position: fixed;
  font-size: 50px;
  color:#f18f01;
  right:50%;
  bottom: 20px;
  border-radius:50%;
  cursor:pointer;
}

@media only screen and (max-width: 768px){
  [class*="col-max"]{
    width:100%;
  }
  .boxvote{
    height:auto;
    width: 33.33%;
  }
}
</style>
