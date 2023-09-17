import { defineStore } from 'pinia'

export const useFormStore = defineStore('changeForm', {
  state: () => ({
    vari: false
  }),
  actions: {
    changeForm() {
        this.vari = !this.vari
    }
  }
})
