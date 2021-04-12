<template>
  <form class="authorization-form">
    <h1>Authorize</h1>
    <input name="name" id="name" type="text" v-model="name" placeholder="name">
    <input name="room" id="room" type="text" v-model="room" placeholder="room">
    <button type="button" @click="enterRoom">Enter</button>
  </form>
</template>

<script>
import { SERVER_URL } from '../utils'

export default {
  name: "AuthorizationForm",
  data: () => ({
    name: '',
    room: ''
  }),
  methods: {
    async enterRoom(event){
      const info = {'name': this.name, 'room': this.room}
      await fetch(SERVER_URL + '/enter', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json;charset=utf-8'
        },
        body: JSON.stringify(info)
      })
      this.$emit('authorized', info)


    }
  }
}
</script>
