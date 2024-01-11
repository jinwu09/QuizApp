<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/store/AuthStore'
import { SwalDesign } from '@/assets/CustomSwal'

const router = useRouter()

const email = ref('')
const password = ref('')
const store = useAuthStore()

function login(e: any) {
  axios
    .post('/auth/login', {
      email: email.value,
      password: password.value
    })
    .then((res) => {
      store.setTokenValue(res.data.payload.token)
      SwalDesign.fire({
        icon: 'success',
        text: res.data.payload.message
      })

      router.push({ name: 'dashboard' })
    })
    .catch((err: any) => {
      SwalDesign.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.payload
      })
    })
}

function navToRegister() {
  router.push({ name: 'register' })
}
</script>

<template>
  <div class="flex flex-col justify-center align-middle items-center h-[100vh]">
    <div class="card w-96 bg-base-100 shadow-xl">
      <form class="card-body" @submit.prevent="login">
        <h2 class="card-title">QuizApp</h2>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Email</span>
          </div>
          <input
            type="email"
            v-model="email"
            autocomplete="off"
            required
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
          <div class="label">
            <span class="label-text">Password</span>
          </div>
          <input
            type="password"
            v-model="password"
            autocomplete="off"
            required
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </label>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" type="submit">LOGIN</button>
        </div>
      </form>
    </div>
    <div class="row mt-3">
      <p class="text-center accountSwitch">
        Dont have an account?
        <u class="accountSwitchLink" @click="navToRegister">REGISTER</u>
      </p>
    </div>
  </div>
</template>
