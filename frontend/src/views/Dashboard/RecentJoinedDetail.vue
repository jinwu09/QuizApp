<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'

import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/AuthStore'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
const store = useAuthStore()
const router = useRouter()
const route = useRoute()

const feedback = ref({} as any)

onMounted(() => {
  axios
    .get('/history/joined/' + route.params.quiz_id, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res: any) => {
      // console.log(quizzes.value)
      feedback.value = res.data.payload[0]
      console.log(res.data.payload[0])
    })
    .catch((err) => {
      // console.log(err)
    })
})
</script>

<template>
  <NavBar />

  <div class="flex justify-center">
    <div class="flex flex-col container gap-3">
      <router-link :to="{ name: 'recent-joined' }">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-arrow-left-square-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"
            />
          </svg>
        </span>
      </router-link>
      <div class="flex justify-center">
        <h1>{{ feedback.title }}</h1>
      </div>
      <div v-for="item in feedback.question" :key="item.id">
        <div class="card w-full bg-neutral shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Question: {{ item.content }}</h2>
            <hr />
            <p>Choices:</p>
            <div v-for="choice in item.choice" :key="choice.id" class="col-md-6">
              <p :class="choice.is_correct ? 'text-green-400' : 'text-red-500'">
                {{ choice.content }}
              </p>
            </div>
            <hr />
            <div v-for="answer in item.answer" :key="answer.id">
              <p :class="answer.choice.is_correct ? 'text-green-400' : 'text-red-500'">
                Your Answer "{{ answer.choice.content }}" is
                {{ answer.choice.is_correct ? 'Right' : 'Wrong' }}
              </p>
            </div>
            <div class="card-actions justify-end">
              <!-- <button class="btn btn-primary">Buy Now</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
