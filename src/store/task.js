// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    currentTask: null
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    async fetchTasks(userId, is_complete) {
      const {data: tasks, error} = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', userId)
          .eq('is_complete', is_complete)
      if (error) throw error;

      return tasks;
    },
    // Fetch single task
    async fetchTask(taskId, userId) {
      const {data: task, error} = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', userId)
          .eq('id', taskId)
      this.currentTask = task;
      if (error) throw error;

      return task[0];
    },
    // Hacer POST
    async create(title, user_id) {
      const { data, error } = await supabase.from('tasks')
      .insert([
          { 
              title: title, 
              user_id: user_id,
              is_complete: false 
          }
      ]);
      if (error){
        console.log(error.message)
        throw error;
      }
    },
    // Hacer el PUT (edit)
    async update(taskId, title, is_complete) {
      console.log("update")
      const { error } = await supabase
        .from('tasks')
        .update({
            title: title,
            is_complete: is_complete,
        })
        .eq("id", taskId);
      if (error){
        console.log(error.message)
        throw error;
      }
    },    
    // Hacer el delete
    async delete(taskId) {
      console.log("delete")
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq("id", taskId);
      if (error){
        console.log(error.message)
        throw error;
      }
    },    
    // Hacer el PUT (cambiar entre completada y pendiente)
    async setTaskCompleted(taskId, is_complete) {
      console.log("setTaskCompleted")
      const { error } = await supabase
        .from('tasks')
        .update({
          is_complete: is_complete
        })
        .eq("id", taskId);
      if (error){
        console.log(error.message)
        throw error;
      }
    },    
  },
});