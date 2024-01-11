<script setup lang="ts">
import RecentPill from '@/components/Dashboard/RecentPill.vue'
import NavBar from '@/components/NavBar.vue'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'vue-router'
import axios from 'axios'
const store = useAuthStore()
const router = useRouter()

const created = ref()

onMounted(() => {
  axios
    .get('/history/created', {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res: any) => {
      // console.log(quizzes.value)
      created.value = res.data.payload
    })
    .catch((err) => {
      // console.log(err)
    })
})
</script>
<template>
  <NavBar />
  <div class="flex justify-center">
    <div class="flex flex-col container">
      <RecentPill />
      <div class="flex flex-row gap-3 flex-wrap">
        <div v-for="quiz in created" :key="quiz.id" class="">
          <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{{ quiz.title }}</h2>
              <p>{{ quiz.description }}</p>
              <div class="card-actions justify-end">
                <button
                  class="btn btn-primary"
                  @click="
                    router.push({ name: 'recent-created-detail', params: { quiz_id: quiz.id } })
                  "
                >
                  View Leaderboards
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
