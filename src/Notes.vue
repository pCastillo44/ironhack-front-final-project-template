<template>
  <div>
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p class="text-red-500">
            {{ errorMsg }}
        </p>
    </div>

    <div v-if="successMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p class="text-red-500">
            {{ successMsg }}
        </p>
    </div>

    <div class="mb-5">
      <form @submit.prevent="createTask" >
        <h3 class="text-2xl mb-5 mt-8 text-center font-bold text-green-500">What task do you want to add?</h3>
          <input class="bg-light-grey border" type="text" v-model="name"/>
          <button class="p-4 bg-light-grey shadow-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" @click="createNote">
            CREATE TASK
          </button>
      </form>
    </div>

    <div v-if="dataLoaded && dataCompleted.length === 0 && dataPending.length === 0" class="container mt-10 px-4">
        <!-- NO DATA -->
        <div class="w-full flex flex-col items-center">
            <h1 class="text-2xl">Looks empty here...</h1>
        </div>
    </div>
    <div v-else-if="dataLoaded" class="grid gap-x-8 gap-y-4 grid-cols-4 m-b-5">
        <div class="col-span-2 px-3">
            <h2 class="text-3xl mb-5 mt-8 text-center font-bold text-sky-700 border-b-4 border-sky-800">
                To-Do Tasks
            </h2>
            <div 
                class="to-do-list [&>a]:bg-sky-200 [&>a]:border-2 [&>a]:border-slate-900 bg-sky-100 h-full p-5 border border-info"
                >
                <div class="mb-4" v-for="item in dataPending">
                  <input class="mr-4" type="text" v-model="item.title"/>
                  <input class="mr-4 h-8 w-8" type="checkbox" v-model="item.is_complete"/>
                  <label for="checkbox">Task completed</label>
                  <br/>
                  <button class="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                   @click="updateTask(item.id, item.title, item.is_complete)">UPDATE TASK</button>
                  <button class=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" 
                    @click="deleteTask(item.id)">DELETE TASK</button>
                    <br/>
                </div>
            </div>
        </div>
        <div class="col-span-2 px-3">
            <h2 class="text-3xl mb-5 mt-8 text-center font-bold text-lime-700 border-b-4 border-lime-800">
                Done Tasks
            </h2>
            <div class="done-list [&>a]:bg-lime-200 [&>a]:border-2 [&>a]:border-slate-900  bg-lime-100 h-full p-5 border border-success">
                <div class="mb-4" v-for="item in dataCompleted">
                  <input class="mr-4" type="text" v-model="item.title"/>
                  <input class="mr-4 h-8 w-8" type="checkbox" v-model="item.is_complete"/>
                  <label for="checkbox">Task completed</label>
                  <br/>
                  <button class="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                   @click="updateTask(item.id, item.title, item.is_complete)">UPDATE TASK</button>
                  <button class=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" 
                    @click="deleteTask(item.id)">DELETE TASK</button>
                    <br/>
                </div>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user.js";
import { useTaskStore } from "./store/task";
import { ref } from "vue";
import { supabase } from './supabase'

export default {
  setup(){
    const dataCompleted = ref([]);
    const dataPending = ref([]);
    const dataLoaded = ref(null);
    const name = ref("");
    const idToFalse = ref("");
    const idToTrue = ref("");
    const errorMsg = ref(null);
    const successMsg = ref(null);
    const userStore = useUserStore();
    const taskStore = useTaskStore();
    const { user } = storeToRefs(userStore);
    
    console.log(user._object.user.id);
    const getData = async () => {
        console.log("getadata");
        try {
            dataCompleted.value = await taskStore.fetchTasks(user._object.user.id, true);
            dataPending.value = await taskStore.fetchTasks(user._object.user.id, false);
            //dataCompleted.value = await taskStore.fetchTasks("a45c94dc-0b2c-4ce8-8899-617c106f76af", true);
            //dataPending.value = await taskStore.fetchTasks("a45c94dc-0b2c-4ce8-8899-617c106f76af", false);
            console.log(dataCompleted.value);
            console.log(dataPending.value);
            dataLoaded.value = true;
        }
        catch (error) {
            console.warn(error.message);
        }
    };
    getData();

    const createTask = async () => {
          if (name.value.length > 0){    
              try {
                  console.log("name value es " + name.value)
                  await taskStore.create(name.value, user._object.user.id);
                  successMsg.value = `Success: Task with name ${ name.value } created!`;
                  getData();
              } catch (error) {
                  console.log(error)
                  errorMsg.value = `Error: ${error.mesage}`
              }
          } else {
              errorMsg.value = "Error: El nombre de la tarea no puede estar vacío"
          }
      }

      const setTaskToFalse = async () => {
          if (name.value.length > 0){    
              try {
                  console.log("name value es " + name.value)
                  await taskStore.create(name.value, user._object.user.id);
                  successMsg.value = `Success: Task with name ${ name.value } created!`;
                  getData();
              } catch (error) {
                  console.log(error)
                  errorMsg.value = `Error: ${error.mesage}`
              }
          } else {
              errorMsg.value = "Error: El nombre de la tarea no puede estar vacío"
          }
      }

      
      const setTaskToTrue = async () => {
          if (name.value.length > 0){    
              try {
                  console.log("name value es " + name.value)
                  await taskStore.create(name.value, user._object.user.id);
                  successMsg.value = `Success: Task with name ${ name.value } created!`;
                  getData();
              } catch (error) {
                  console.log(error)
                  errorMsg.value = `Error: ${error.mesage}`
              }
          } else {
              errorMsg.value = "Error: El nombre de la tarea no puede estar vacío"
          }
      }
    
    return { name, createTask, getData, taskStore, errorMsg, successMsg, dataPending, dataLoaded, dataCompleted };
  }, 
  methods:{
      async updateTask(taskId, title, completed){
          console.log("hola soc updateTask")
          console.log(title);
          console.log(taskId);
          console.log(completed);
          await this.taskStore.update(taskId, title, completed);
          this.getData();
      },
      async deleteTask(taskId){
          console.log("hola soc deleteTask")
          await this.taskStore.delete(taskId);
          this.getData();
      }
   }
}
</script>

<style>
body {
    background-color: rgb(253, 253, 242);
}</style>