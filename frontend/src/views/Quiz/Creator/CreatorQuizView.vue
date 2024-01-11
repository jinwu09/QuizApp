<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { socket } from '@/Socket/SocketConfig'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const question: any = ref({
  content: 'loading...',
  choice: [
    { content: 'loading...' },
    { content: 'loading...' },
    { content: 'loading...' },
    { content: 'loading...' }
  ]
})
const FirstQuestion = ref(true)
const LastQuestion = ref(false)

function PreviousQuestion() {
  socket.emit('previous', { Roomname: route.params.room })
}

function nextQuestion() {
  socket.emit('next', { Roomname: route.params.room })
}
function DoneSession() {
  socket.emit('Done', { Roomname: route.params.room })
}

socket.on('refresh', () => {
  socket.emit('QuizLoad', { Roomname: route.params.room })
  socket.emit('AdminQuizLoad', { Roomname: route.params.room })
})

socket.on('AdminQuizLoad', (res) => {
  FirstQuestion.value = res.FirstQuestion
  LastQuestion.value = res.LastQuestion
})
socket.on('QuizLoad', (res) => {
  //   console.log(res)
  question.value = res.question
})
socket.on('redirectToDone', (res) => {
  router.push({
    name: res.PageName,
    params: {
      room: route.params.room,
      session: res.session.id
    }
  })
})
onMounted(() => {
  socket.emit('QuizLoad', { Roomname: route.params.room })
  socket.emit('AdminQuizLoad', { Roomname: route.params.room })
})
onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<template>
  <NavBar />
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-center box">
      <div class="row w-100">
        <div class="col-md-12">
          <div class="flex justify-between mx-5">
            <button class="btn btn-primary" @click="PreviousQuestion()" :disabled="FirstQuestion">
              Previous
            </button>
            <button
              class="btn btn-primary"
              @click="nextQuestion()"
              :disabled="LastQuestion"
              v-if="LastQuestion == false"
            >
              Next
            </button>
            <button class="btn btn-primary" @click="DoneSession()" v-if="LastQuestion == true">
              Done
            </button>
          </div>
          <div class="row question-area mt-2 bg-base-300">
            <h3 class="h3" id="text">
              {{ question.content }}
            </h3>
          </div>
          <div class="flex flex-col text-center gap-3 mt-5">
            <div class="card w-full bg-base-300 shadow-xl">
              <div class="card-body">
                {{ question.choice[0].content }}
              </div>
            </div>
            <div class="card w-full bg-base-300 shadow-xl">
              <div class="card-body">
                {{ question.choice[1].content }}
              </div>
            </div>
            <div class="card w-full bg-base-300 shadow-xl">
              <div class="card-body">
                {{ question.choice[2].content }}
              </div>
            </div>
            <div class="card w-full bg-base-300 shadow-xl">
              <div class="card-body">
                {{ question.choice[3].content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  height: 90vh;
}

.question-area {
  min-height: 30vh;
  padding: 20px;
  word-wrap: break-word;
}

/* #text{
        font-size: var(--font-size);
    } */

.q-button,
.a-button {
  text-align: center;
  background-color: #d9d9d9;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.a-button {
  min-height: 90px;
  word-wrap: break-word;
  padding: 16px;
}
</style>
