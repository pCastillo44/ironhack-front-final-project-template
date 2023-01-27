<template>
  <div class="min-h-screen flex flex-col justify-between font-Poppins box-border">
    <Navigation />
    <section class="overflow-hidden mb-20">
      <router-view class="app-main" />
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user.js";
import { ref } from "vue";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);


onMounted(async () => {
   try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: "/auth" });
    } else {
      // continue to dashboard
      router.push({ path: "/notes" });
    }
  } catch (e) {
    console.log(e);
  }
});

</script>
