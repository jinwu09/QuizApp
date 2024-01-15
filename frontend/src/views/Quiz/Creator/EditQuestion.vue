<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import { SwalDesign } from '@/assets/CustomSwal'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import Vue from "vue";
const route = useRoute()
const router = useRouter()

const store = useAuthStore()

const content = ref('')
const score = ref(0)

const choice_a = ref({
  id: '',
  content: '',
  isCorrect: ''
})

const choice_b = ref({
  id: '',
  content: '',
  isCorrect: ''
})

const choice_c = ref({
  id: '',

  content: '',
  isCorrect: ''
})

const choice_d = ref({
  id: '',
  content: '',
  isCorrect: true
})

function updateQuiz() {
  // console.log(route.params.question_id)
  axios
    .put(
      '/question/' + route.params.question_id,
      {
        content: content.value,
        score: score.value,
        choices: [
          {
            id: choice_a.value.id,
            content: choice_a.value.content,
            is_correct: choice_a.value.isCorrect
          },
          {
            id: choice_b.value.id,
            content: choice_b.value.content,
            is_correct: choice_b.value.isCorrect
          },
          {
            id: choice_c.value.id,
            content: choice_c.value.content,
            is_correct: choice_c.value.isCorrect
          },
          {
            id: choice_d.value.id,
            content: choice_d.value.content,
            is_correct: choice_d.value.isCorrect
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
onMounted(() => {
  axios
    .get('/question/' + route.params.question_id, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      console.log(res.data.payload)
      content.value = res.data.payload.content
      score.value = res.data.payload.score

      choice_a.value.id = res.data.payload.choice[0].id
      choice_a.value.content = res.data.payload.choice[0].content
      choice_a.value.isCorrect = res.data.payload.choice[0].is_correct

      choice_b.value.id = res.data.payload.choice[1].id
      choice_b.value.content = res.data.payload.choice[1].content
      choice_b.value.isCorrect = res.data.payload.choice[1].is_correct

      choice_c.value.id = res.data.payload.choice[2].id
      choice_c.value.content = res.data.payload.choice[2].content
      choice_c.value.isCorrect = res.data.payload.choice[2].is_correct

      choice_d.value.id = res.data.payload.choice[3].id
      choice_d.value.content = res.data.payload.choice[3].content
      choice_d.value.isCorrect = res.data.payload.choice[3].is_correct
    })
})
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
              <option disabled value="" class="" selected>Select Quiz Points</option>
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
              <button class="btn btn-primary" @click="updateQuiz">Update</button>
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
      </div>

      <!-- third main column -->
      <div class="col-1"></div>
    </div>
  </div>
</template>
