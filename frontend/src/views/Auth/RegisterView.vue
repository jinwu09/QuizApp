<script setup lang="ts">
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import { SwalDesign } from '@/assets/CustomSwal'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useAuthStore()

const fname = ref()
const lname = ref()
const email = ref()
const password = ref()
const cpassword = ref()

function register() {
  axios
    .post('auth/register', {
      firstName: fname.value,
      lastName: lname.value,
      email: email.value,
      password: password.value,
      confirm_password: cpassword.value
    })
    .then((res) => {
      SwalDesign.fire({
        title: res.data.payload.message
      })

      store.setTokenValue(res.data.payload.token)

      router.push({ name: 'dashboard' })
    })
    .catch((err) => {
      SwalDesign.fire({
        icon: 'error',
        title: err.response.data.payload
      })
    })
}

function navToLogin() {
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex flex-col justify-center align-middle items-center h-[100vh]">
    <div class="card w-96 bg-base-100 shadow-xl">
      <form class="card-body" @submit.prevent="register">
        <h2 class="card-title">QuizApp</h2>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">First Name</span>
          </div>
          <input
            type="text"
            v-model="fname"
            autocomplete="off"
            required
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
          <div class="label">
            <span class="label-text">Last Name</span>
          </div>
          <input
            type="text"
            v-model="lname"
            autocomplete="off"
            required
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
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
          <div class="label">
            <span class="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            v-model="cpassword"
            autocomplete="off"
            required
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </label>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" type="submit">REGISTER</button>
        </div>
      </form>
    </div>
    <div class="row mt-3">
      <p class="text-center accountSwitch">
        Dont have an account?
        <u class="accountSwitchLink" @click="navToLogin">LOGIN</u>
      </p>
    </div>
  </div>
</template>
