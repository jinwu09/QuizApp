<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'vue-router'
const store = useAuthStore()

const quizzes: any = ref({})
const JoinRoom = ref('')

const router = useRouter()

onMounted(() => {
  axios
    .get('/quiz', {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res: any) => {
      quizzes.value = res.data.payload
    })
    .catch((err) => {
      // console.log(err)
    })
})

function navToCreateTest() {
  router.push({ name: 'create-quiz' })
}

function editQuiz(id: any) {
  router.push({
    name: 'update-quiz',
    params: {
      quiz_id: id
    }
  })
}

function joinLobbyAsJoiner(room: any) {
  router.push({
    name: 'quiz-lobby',
    params: {
      room: room
    }
  })
}
</script>

<template>
  <NavBar />
  <div class="flex justify-center">
    <div class="container justify-center flex flex-col gap-4">
      <div class="flex flex-row justify-center gap-5">
        <div class="card w-96 bg-base-100 shadow-xl">
          <form class="card-body" @submit.prevent="joinLobbyAsJoiner(JoinRoom)">
            <h2 class="card-title">have a room in mind</h2>
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">Room Number</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
                v-model="JoinRoom"
              />
            </label>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" type="submit" @click="joinLobbyAsJoiner(JoinRoom)">
                JOIN
              </button>
            </div>
          </form>
        </div>

        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Have a quiz in mind</h2>
            <!-- <label class="form-control w-full max-w-xs"> </label> -->
            <div class="card-actions justify-end">
              <p>click to create a quiz</p>
              <button class="btn btn-primary" @click="navToCreateTest">Create a Quiz</button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-5">
        <div v-for="quiz in quizzes" :key="quiz.id">
          <div class="card w-96 bg-base-100 shadow-xl" v-show="quiz.condition != 'CLOSED'">
            <div class="card-body">
              <div class="flex justify-between">
                <h2 class="card-title">{{ quiz.title }}</h2>

                <div v-if="quiz.admin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#F7A531"
                    class="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    />
                  </svg>
                </div>
                <div v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#F7A531"
                    class="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                    />
                  </svg>
                </div>
              </div>

              <!-- <label class="form-control w-full max-w-xs"> </label> -->
              <p>description:</p>
              <div class="pl-2">
                <p>{{ quiz.description }}</p>
              </div>
              <p>Created by: {{ quiz.creator.first_name + ' ' + quiz.creator.last_name }}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-secondary" v-show="quiz.admin" @click="editQuiz(quiz.id)">
                  Edit
                </button>
                <button class="btn btn-primary" @click="joinLobbyAsJoiner(quiz.room[0].room)">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* @import url('@/assets/dashboard.css'); */
</style>
