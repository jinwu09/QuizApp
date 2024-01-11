<script setup lang="ts">
import QuestionBox from '@/components/Dashboard/QuestionBox.vue'
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import { SwalDesign } from '@/assets/CustomSwal'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useAuthStore()

const router = useRouter()

const title = ref('')
const room_passcode = ref('')
const description = ref('')
const status = ref('')
const password = ref('')
const image_path = ref('')

function createQuiz() {
  axios
    .post(
      '/quiz/',
      {
        title: title.value,
        room: room_passcode.value,
        description: description.value,
        status: status.value,
        password: status.value == 'PRIVATE' ? password.value : null,
        image_path: image_path.value
      },
      {
        headers: {
          Authorization: 'Bearer ' + store.token
        }
      }
    )
    .then((res) => {
      SwalDesign.fire({
        icon: 'success',
        title: res.data.payload.message
      })

      router.push({
        name: 'update-quiz',
        params: {
          quiz_id: res.data.payload.quiz_id
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <NavBar />

  <div class="flex justify-center">
    <div class="flex container justify-center">
      <form class="card w-full bg-base-100 shadow-xl" @submit.prevent="createQuiz">
        <div class="card-body">
          <h2 class="card-title">Create You Quiz:</h2>
          <!-- input start here -->
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              v-model="title"
              autocomplete="off"
              required
            />
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Room Number</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              v-model="room_passcode"
              autocomplete="off"
              required
            />
          </label>
          <div class="">
            <div class="">
              <label class="">Room Status <span class=""></span></label>
              <select
                class="form-select"
                aria-label=".form-select-lg example"
                v-model="status"
                required
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>
          </div>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Room Password</span>
            </div>
            <input
              type="text"
              v-model="password"
              placeholder="Type here"
              autocomplete="off"
              class="input input-bordered w-full max-w-xs"
              :disabled="status == 'PUBLIC' || status == ''"
              :required="status == 'PRIVATE'"
            />
          </label>
          <div class="mb-3">
            <label class="form-label">Description <span class="text-muted"></span></label>
            <textarea
              type="text"
              v-model="description"
              class="form-control w-full"
              autocomplete="off"
              required
            ></textarea>
          </div>
          <!-- input stop here -->
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="router.push({ name: 'dashboard' })">
              Cancel
            </button>
            <button class="btn btn-primary" type="submit">Create Quiz</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
