<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const UserList: any = ref([
  // {
  //   "first_name":"unkown",
  //   "last_name":"unkown",
  //   "score": 100
  // },
  //   {
  //   "first_name":"unkown ",
  //   "last_name":"unkown",
  //   "score": 5
  // },
])
const TotalScore = ref(0)

TotalScore.value = 5

onMounted(() => {
  axios
    .get(`quiz/leaderboard/${route.params.session}/${route.params.room}`, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      UserList.value = res.data.payload.UsersScore
      TotalScore.value = res.data.payload.QuizTotal
    })

  UserList.value.sort((a: any, b: any) => parseFloat(a.score) - parseFloat(b.price))
})
</script>

<template>
  <NavBar />
  <div class="flex justify-center">
    <div class="container flex flex-col">
      <div class="flex flex-col gap-10">
        <div class="card w-full bg-base-300 shadow-xl">
          <div class="card-body text-center">
            <h1 class="text-2xl">Leaderboards:</h1>
          </div>
        </div>
        <div v-for="user in UserList" :key="user.id">
          <div class="flex justify-between">
            <div class="card w-full bg-neutral shadow-xl">
              <div class="card-body flex-row justify-between">
                <h5>{{ user.first_name }} {{ user.last_name }}</h5>
                <h5>{{ user.score }} / {{ TotalScore }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
  <!-- <div class="test">
    <h1>LeaderBoards</h1>
    <div v-for="user in UserList" :key="user.id">
      <p>{{ user.first_name }} {{ user.last_name }} {{ user.score }} / {{ TotalScore }}</p>
    </div>
  </div> -->
</template>
