<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import RecentPill from '@/components/Dashboard/RecentPill.vue'

import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'vue-router'
import axios from 'axios'
const store = useAuthStore()
const router = useRouter()

const joined = ref()

onMounted(() => {
  axios
    .get('/history/joined', {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res: any) => {
      // console.log(res.data.payload)
      // console.log(quizzes.value)
      joined.value = res.data.payload
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
        <div v-for="j in joined" :key="j.quiz_id" class="">
          <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{{ j.title }}</h2>
              <h3 class="card-title">{{ j.user_score }} / {{ j.quiz_score }}</h3>
              <p>{{ j.description }}</p>
              <div class="card-actions justify-end">
                <button
                  class="btn btn-primary"
                  @click="
                    router.push({ name: 'recent-joined-detail', params: { quiz_id: j.quiz_id } })
                  "
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
