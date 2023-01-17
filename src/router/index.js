import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue"
import Notes from "../Notes.vue"
import Register from "../Register.vue"
import Login from "../Login.vue"


const routes = [
  {
    path: "/auth",
    name: "Login",
    component: Login
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
