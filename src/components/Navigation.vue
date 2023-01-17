<template>
    <header class="bg-blue-900 text-white mb-20">
      <nav class="py-5 px-4 flex-column gap-4 items-center sm:flex-row">
          <div class="flex items-center gap-x-4 ">
              <img class="w-14" src="../components/images/logo.png" alt="App Logo">
              <h1 class="text-lg">Task To-Do</h1>
              <ul class="flex flex-1 justify-end gap-x-10">
                <router-link v-if="!user" class="cursor-pointer" :to="{name: 'Login'}">Login</router-link>
                <router-link v-if="!user" class="cursor-pointer" :to="{name: 'Register'}">Register</router-link>
                <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
            </ul>
          </div>
      </nav>
    </header>
  </template>
  
  <script>
  import { storeToRefs } from "pinia";
  import { useUserStore } from "./../store/user";
  export default {
    setup() {
      const userStore = useUserStore();
      const { user } = storeToRefs(userStore);
      return{userStore, user}
    },
    methods : {
      async logout() {
       await this.userStore.signOut();
        console.log("logout")
        this.$router.push({ name: "Login" });
      }
    }
  }
  </script>

  <style>

</style>