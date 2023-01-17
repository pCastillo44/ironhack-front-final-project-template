<template>
  <section>
    <router-view/>
  </section>

  <form @submit.prevent="login">
  <label for="email">Email:</label>
  <input class="border-2" type="email" id="email" name="email" v-model="email">
  <br>
  <label for="password">Password:</label>
  <input class="border-2" type="password" id="password" name="password" v-model="password">
  <br>
  <input type="submit" value="Login">
</form>
<div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg bg-orange-200">
    <p class="text-red-500 font-bold">
        {{ errorMsg }}
    </p>
</div>

</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user.js";
import { ref } from "vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const email = ref(null);
const password = ref(null);
const errorMsg = ref(null);

  const login = async () => {
      try{
          console.log("email")
          console.log(email.value)
          console.log("password")
          console.log(password.value)
          await userStore.signIn(email.value, password.value)
          //if (error) throw error;
          router.push({ name: "Notes" });
      } catch (error) {
          errorMsg.value = `Error: ${error.message}`;          
      }

      return { email, password, errorMsg, login };
  }
  

</script>

<style>

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

label {
  font-size: 20px;
  margin-bottom: 10px;
}

input[type="email"], input[type="password"] {
  width: 300px;
  height: 40px;
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
}

input[type="submit"] {
  width: 150px;
  height: 40px;
  font-size: 18px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: darkblue;
}

</style>