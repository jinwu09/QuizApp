<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'
import { ref } from 'vue'
import { checkCompatEnabled } from '@vue/compiler-core'
import NavBar from '@/components/NavBar.vue'
const route = useRoute()
const store = useAuthStore()

interface IFeedbacks {
  title: string
  question: [
    {
      id: number
      content: string
      score: number
      quizId: number
      choice: [
        {
          id: number
          content: string
          is_correct: boolean
          questionId: number
        }
      ]
      answer: [
        {
          id: number
          choice: {
            id: number
            content: string
            is_correct: boolean
          }
        }
      ]
    }
  ]
}
const feedback = ref<IFeedbacks>()

onMounted(() => {
  axios
    .get(`quiz/feedback/${route.params.session}`, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      // console.log(res.data.payload.feedback)
      feedback.value = res.data.payload.feedback
    })
})
</script>

<template>
  <NavBar />

  <div class="flex justify-center">
    <div class="container flex flex-col gap-3">
      <div class="flex justify-center">
        <h1>{{ feedback?.title }}</h1>
      </div>
      <div v-for="item in feedback?.question" :key="item.id">
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
