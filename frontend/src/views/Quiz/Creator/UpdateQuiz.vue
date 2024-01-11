<script setup lang="ts">
import QuestionBox from '@/components/Dashboard/QuestionBox.vue'
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SwalDesign } from '@/assets/CustomSwal'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const title = ref('')
const room_passcode = ref('')
const description = ref('')
const status = ref('')
const password = ref('')
const quiz_id = ref('')
const image_path = ref('')

const questions: any = ref([])

function updateQuiz() {
  SwalDesign.fire({
    title: 'Are you sure you want to update your quiz settings?',
    icon: 'warning',
    timer: 0,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Yes, update it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(
          '/quiz/' + quiz_id.value,
          {
            title: title.value,
            room: room_passcode.value,
            description: description.value,
            status: status.value,
            password: password.value,
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
            title: res.data.payload
          })

          password.value = ''
        })
        .catch((err) => {
          SwalDesign.fire({
            icon: 'error',
            title: err.data.payload
          })
        })
    }
  })
}

function deleteQuiz() {
  SwalDesign.fire({
    title: 'Are you sure you want to delete your quiz?',
    icon: 'warning',
    showCancelButton: true,
    showConfirmButton: true,
    timer: 0,
    confirmButtonColor: '#8a2f2f',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete('/quiz/' + quiz_id.value, {
          headers: {
            Authorization: 'Bearer ' + store.token
          }
        })
        .then((res) => {
          SwalDesign.fire({
            icon: 'success',
            title: res.data.payload
          })

          router.push({ name: 'dashboard' })
        })
        .catch((err) => {
          SwalDesign.fire({
            icon: 'question',
            title: err.data.payload
          })
        })
    }
  })
}
function GoToLobby() {
  router.push({
    name: 'creator-lobby',
    params: {
      room: room_passcode.value
    }
  })
}
function addNewQuestion() {
  router.push({
    name: 'blank-question',
    params: {
      quiz_id: quiz_id.value
    }
  })
}

function deleteQuestion() {
  axios
    .get('/quiz/' + route.params.quiz_id, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      questions.value = res.data.data
    })
}

function updateQuestion(e: any) {
  router.push({
    name: 'edit-question',
    params: {
      question_id: e.id,
      quiz_id: route.params.quiz_id
    }
  })
}

onMounted(() => {
  axios
    .get('/quiz/' + route.params.quiz_id, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      if (res.data.payload == null) {
        router.push({
          name: 'NotFound'
        })
      }
      const payload = res.data.payload
      title.value = payload.title
      room_passcode.value = payload.room[0].room
      status.value = payload.status
      quiz_id.value = payload.id
      description.value = payload.description
      questions.value = payload.question
      image_path.value = payload.image_path
    })
})
</script>

<template>
  <NavBar />
  <div class="flex justify-center">
    <div class="flex flex-col gap-2 container justify-center">
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
            <button class="btn btn-primary" type="submit">Update Quiz</button>
            <button class="btn btn-secondary" type="button" @click="deleteQuiz">Delete Quiz</button>
            <button class="btn btn-neutral" type="button" @click="GoToLobby()">Go to Lobby</button>
          </div>
        </div>
      </form>
      <!-- end of forms -->
      <div
        :class="index == 0 ? 'row' : 'row pt-3'"
        v-for="(value, index) in questions"
        :key="value.id"
      >
        <QuestionBox
          :question_id="value.id"
          :points="value.score"
          :question_content="value.content"
          :choice_a="value.choice[0].content"
          :choice_a_is-correct="value.choice[0].is_correct"
          :choice_b="value.choice[1].content"
          :choice_b_is-correct="value.choice[1].is_correct"
          :choice_c="value.choice[2].content"
          :choice_c_is-correct="value.choice[2].is_correct"
          :choice_d="value.choice[3].content"
          :choice_d_is-correct="value.choice[3].is_correct"
          @delete="deleteQuestion"
          @update="updateQuestion"
        />
      </div>
      <button class="btn btn-primary" @click="addNewQuestion">Add New Question</button>
    </div>
  </div>
</template>
