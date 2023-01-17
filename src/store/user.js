import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
      })
      if (error){
        console.log("error en store")
        console.log(error.message)
        throw error;
      }
      if (user) this.user = user;
    },
    // Hacer sign in
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password
      })
      if (error){
        console.log(error.message)
        throw error;
      } 
      if (user) this.user = user;
    },
    // Hacer log out
    async signOut(){
      let { error } = await supabase.auth.signOut();
      this.user = null;
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});