<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import { SwalDesign } from '@/assets/CustomSwal'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import Vue from "vue";
const route = useRoute()
const router = useRouter()

const store = useAuthStore()

const content = ref('')
const score = ref(1)

const choice_a = ref({
  content: '',
  isCorrect: false
})

const choice_b = ref({
  content: '',
  isCorrect: false
})

const choice_c = ref({
  content: '',
  isCorrect: false
})

const choice_d = ref({
  content: '',
  isCorrect: false
})

function createQuiz() {
  axios
    .post(
      '/question/',
      {
        content: content.value,
        score: score.value,
        quizId: route.params.quiz_id,
        choices: [
          {
            content: choice_a.value.content,
            isCorrect: choice_a.value.isCorrect
          },
          {
            content: choice_b.value.content,
            isCorrect: choice_b.value.isCorrect
          },
          {
            content: choice_c.value.content,
            isCorrect: choice_c.value.isCorrect
          },
          {
            content: choice_d.value.content,
            isCorrect: choice_d.value.isCorrect
          }
        ]
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

      router.push({ name: 'update-quiz', params: { quiz_id: route.params.quiz_id } })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <NavBar />

  <div class="flex justify-center">
    <div class="flex container flex-col gap-6">
      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex justify-between">
            <select
              class="form-select hvr-grow-rotate"
              aria-label="Default select example"
              v-model="score"
            >
              <option disabled value="" class="hvr-grow-rotate" selected>Select Quiz Points</option>
              <option>0</option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
            <div>
              <!--  -->
              <button
                class="btn btn-neutral"
                @click="
                  router.push({ name: 'update-quiz', params: { quiz_id: route.params.quiz_id } })
                "
              >
                Cancel
              </button>
              <button class="btn btn-primary" @click="createQuiz">Create</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card w-full bg-base-100 shadow-xl">
        <div class="flex justify-center">
          <p>Question</p>
        </div>
        <div class="card-body">
          <textarea
            v-model="content"
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            class="w-full bg-base-200 align-center text-center border-none bigTextbox w-100 px-3 py-5"
            placeholder="Insert your Question here"
          ></textarea>
        </div>
      </div>

      <!-- second main column -->
      <div class="col-10">
        <!-- second main column second row -->

        <!-- second main column third row -->
      </div>
      <div class="row">
        <div class="d-flex flex flex-col gap-2">
          <!-- q1 -->
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body flex flex-row gap-7">
              <div class="form-control">
                <label class="cursor-pointer label h-full">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-success"
                    v-model="choice_a.isCorrect"
                  />
                </label>
              </div>
              <textarea
                name="text"
                v-model="choice_a.content"
                oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                class="w-full bg-base-200"
                placeholder="Insert answer"
              ></textarea>
            </div>
          </div>
          <!-- q2 -->
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body flex flex-row gap-7">
              <div class="form-control">
                <label class="cursor-pointer label h-full">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-success"
                    v-model="choice_b.isCorrect"
                  />
                </label>
              </div>
              <textarea
                name="text"
                v-model="choice_b.content"
                oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                class="w-full bg-base-200"
                placeholder="Insert answer"
              ></textarea>
            </div>
          </div>
          <!-- q3 -->
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body flex flex-row gap-7">
              <div class="form-control">
                <label class="cursor-pointer label h-full">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-success"
                    v-model="choice_c.isCorrect"
                  />
                </label>
              </div>
              <textarea
                name="text"
                v-model="choice_c.content"
                oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                class="w-full bg-base-200"
                placeholder="Insert answer"
              ></textarea>
            </div>
          </div>
          <!-- q4 -->
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body flex flex-row gap-7">
              <div class="form-control">
                <label class="cursor-pointer label h-full">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-success"
                    v-model="choice_d.isCorrect"
                  />
                </label>
              </div>
              <textarea
                name="text"
                v-model="choice_d.content"
                oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                class="w-full bg-base-200"
                placeholder="Insert answer"
              ></textarea>
            </div>
          </div>
          <!-- end -->
        </div>
      </div>

      <!-- third main column -->
      <div class="col-1"></div>
    </div>
  </div>
</template>
