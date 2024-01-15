<script setup lang="ts">
import { ref } from 'vue'
import { socket } from '@/Socket/SocketConfig'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'
const route = useRoute()
const router = useRouter()

const has_submitted = ref(true)
const Choies: any = ref([])
const QuestionID: any = ref(0)
socket.emit('QuizLoad', { Roomname: route.params.room })

socket.on('QuizLoad', (res) => {
  has_submitted.value = res.has_submitted
  Choies.value = res.question.choice
  QuestionID.value = res.question.id
})
socket.on('refresh', () => {
  //   console.log('refreshing')
  socket.emit('QuizLoad', { Roomname: route.params.Room })
})
socket.on('redirectToDone', (res) => {
  router.push({
    name: res.PageName,
    params: {
      session: res.session.id
    }
  })
})
const motivational_quotes = [
  '“We cannot solve problems with the kind of thinking we employed when we came up with them.” — Albert Einstein',
  '“Learn as if you will live forever, live like you will die tomorrow.” — Mahatma Gandhi',
  '“Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.” — Mark Twain',
  '“When you change your thoughts, remember to also change your world.”—Norman Vincent Peale',
  '“It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest. —Walter Anderson',
  '“Success is peace of mind, which is a direct result of self-satisfaction in knowing you made the effort to become the best of which you are capable.” —John Wooden',
  '“Success is getting what you want, happiness is wanting what you get.” ―W. P. Kinsella',
  '“If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.” — Steve Jobs',
  '“You learn more from failure than from success. Don’t let it stop you. Failure builds character.” — Unknown ',
  '“The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty." — Winston Churchill',
  '“Setting goals is the first step in turning the invisible into the visible.” — Tony Robbins'
]

function get_motivational_quotes() {
  return motivational_quotes[Math.floor(Math.random() * motivational_quotes.length)]
}
function submit(id: number) {
  socket.emit('AnswerSubmit', { choice: id, QuestionID: QuestionID.value })
  has_submitted.value = true
}
socket.on('AnswerSubmited', (res) => {
  has_submitted.value = res.has_Submitted
})
onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<template>
  <main>
    <div v-if="!has_submitted">
      <div class="flex justify-center h-[100vh]">
        <div class="container flex flex-col gap-4 m-auto">
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{{ Choies[0].content }}</h2>
              <div class="card-actions justify-end">
                <button class="btn btn-primary" @click="submit(Choies[0].id)">Answer</button>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{{ Choies[1].content }}</h2>
              <div class="card-actions justify-end">
                <button class="btn btn-primary" @click="submit(Choies[1].id)">Answer</button>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{{ Choies[2].content }}</h2>
              <div class="card-actions justify-end">
                <button class="btn btn-primary" @click="submit(Choies[2].id)">Answer</button>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{{ Choies[3].content }}</h2>
              <div class="card-actions justify-end">
                <button class="btn btn-primary" @click="submit(Choies[3].id)">Answer</button>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center h-[100vh]">
        <div class="flex container m-auto">
          <div class="col-md-12 d-flex align-items-center justify-content-center vh-100">
            <div>
              <div class="row d-flex align-items-center justify-content-center">
                <span class="loader"></span>
              </div>
              <div class="center">
                <p class="text-center text-white">{{ get_motivational_quotes() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #263038;
}

.box {
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.box-1 {
  background-color: #7e549e;
}

.box-1:hover {
  background-color: #583772;
  cursor: pointer;
}

.box-2 {
  background-color: #c2549d;
}

.box-2:hover {
  background-color: #8f3972;
  cursor: pointer;
}

.box-3 {
  background-color: #fc8370;
}

.box-3:hover {
  background-color: #bd5e4f;
  cursor: pointer;
}

.box-4 {
  background-color: #fecb3e;
}

.box-4:hover {
  background-color: #b69028;
  cursor: pointer;
}

.icon {
  height: 64px;
  width: 64px;
  color: #fff;
}

.loader {
  width: 200px;
  height: 140px;
  background: var(--main-color);
  box-sizing: border-box;
  position: relative;
  border-radius: 8px;
  perspective: 1000px;
}

.loader:before {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
  border-radius: 8px;
  background: #f5f5f5 no-repeat;
  background-size: 60px 10px;
  background-image: linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0), linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0), linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0);

  background-position: 15px 30px, 15px 60px, 15px 90px, 105px 30px, 105px 60px, 105px 90px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}

.loader:after {
  content: '';
  position: absolute;
  width: calc(50% - 10px);
  right: 10px;
  top: 10px;
  bottom: 10px;
  border-radius: 8px;
  background: #fff no-repeat;
  background-size: 60px 10px;
  background-image: linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0), linear-gradient(#ddd 100px, transparent 0);
  background-position: 50% 30px, 50% 60px, 50% 90px;
  transform: rotateY(0deg);
  transform-origin: left center;
  animation: paging 1s linear infinite;
}

@keyframes paging {
  to {
    transform: rotateY(-180deg);
  }
}

.text {
  color: #fff;
}
</style>
