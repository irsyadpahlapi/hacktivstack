<template>
  <div class="container">
    <div class="row">
        <div class="col-max-2" align="center" style="margin-top:20px;">
          <div class="col-max-12">
            <i class="fas fa-caret-square-up btnvote" @click="votequestion(1)"></i>
          </div>
          <div class="col-max-12">
            <span style="font-size:20px;">{{detailquestion.vote}}</span>
          </div>
          <div class="col-max-12">
            <i class="fas fa-caret-square-down btnvote" @click="votequestion(-1)"></i>
          </div>
        </div>
        <div class="col-max-10">
          <div class="col-max-12">
            <h3>{{detailquestion.question}}</h3>
          </div>
          <div class="col-max-12">
            <div class="boxcode">
              <code v-html="detailquestion.code">
                <pre>{{detailquestion.code}}</pre>
              </code>
            </div>
          </div>
          <div class="col-max-12 tag">
            <div class="tagbox" v-for="(m, j) in detailquestion.tag" :key="j">
              {{m}}
            </div>
          </div>
        </div>
    </div>
    <hr>
    <div class="row" style="padding-left:50px;">
      <div class="header col-max-12">
        <h3 v-if="detailquestion.answer !== undefined">{{ detailquestion.answer.length }} Answer</h3>
        <h3 v-else>0 answer </h3>
        <hr>
        <div class="row" style="border-bottom:1px solid rgba(100,100,100,0.2); padding-bottom:20px; margin-bottom:10px;" v-for="(n, i) in detailquestion.answer" :key="i">
          <div class="col-max-2" align="center" style="margin-top:20px;">
            <div class="col-max-12">
              <i class="fas fa-caret-square-up btnvote" @click="voteanswer(i,1)"></i>
            </div>
            <div class="col-max-12">
              <span style="font-size:20px;">{{n.votes}}</span>
            </div>
            <div class="col-max-12">
              <i class="fas fa-caret-square-down btnvote" @click="voteanswer(i,-1)"></i>
            </div>
          </div>
          <div class="col-max-10">
            <div class="col-max-12">
              <h3>{{n.answer}}</h3>
            </div>
            <div class="col-max-12">
              <div class="boxcode">
                <code v-html="n.codes">
                  <pre>{{n.codes}}</pre>
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-max-8" style="margin:auto;">
        <label for="yourquestion">Your Answer</label>
        <textarea id="yourquestion" placeholder="your answer" v-model="addanswers" style="width:98%; height:100px; padding:1%;"></textarea>
        <label for="Your Code">Your Code</label>
        <vue-editor style="width:100%;" v-model="addcodes"></vue-editor>
        <button type="button" name="button" style="float:right; background-color:transparent; border:1px solid grey; padding:10px; margin:20px 0px;" onmouseover='this.style.background="black";this.style.color="white";' onmouseout='this.style.background="transparent";this.style.color="black";' @click="addanswer"><i class="fa fa-spinner fa-spin" v-show="load"></i>Send My Answer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
export default {
  name: 'detailquestion',
  data () {
    return {
      load: false,
      addanswers: '',
      addcodes: '',
      detailquestion: {},
      myanswer: [],
      isvoteanswer: false,
      isvotequestion: false
    }
  },
  created: function () {
    this.showdetail()
    this.views()
  },
  methods: {
    questionanswer () {
      this.load = true
      setTimeout(() => {
        console.log('time')
        this.load = false
      }, 3000)
    },
    showdetail () {
      axios.get(`http://localhost:3000/detailquestion/${this.$route.params.id}`).then(response => {
        this.detailquestion = response.data.data
      })
    },
    addanswer () {
      this.load = true
      setTimeout(() => {
        this.myanswer = this.detailquestion.answer
        this.myanswer.push({ id: Date.now(), answer: this.addanswers, codes: this.addcodes, votes: 0 })
        axios.post(`http://localhost:3000/addanswer/${this.$route.params.id}`, {
          answer: this.myanswer
        }).then(response => {
          this.showdetail()
          this.load = false
        })
      }, 2000)
    },
    voteanswer (index, angka) {
      if (!this.isvoteanswer) {
        this.detailquestion.answer[index].votes += angka
        this.isvoteanswer = true
      }
    },
    votequestion (angka) {
      if (!this.isvotequestion) {
        this.detailquestion.vote += angka
        this.isvotequestion = true
        axios.put(`http://localhost:3000/voteupdate/${this.$route.params.id}`, {
          vote: this.detailquestion.vote
        }).then(response => {
          console.log(response)
          this.showdetail()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    views () {
      axios.put(`http://localhost:3000/views/${this.$route.params.id}`).then(response => {
        console.log(response)
      })
    }
  },
  components: {
    VueEditor
  }
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
.boxcode{
  padding:20px;
  background-color: #eff0f1;
  border-radius: 4px;
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
.btnvote{
  font-size: 30px;
  color:#f18f01;
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
</style>
