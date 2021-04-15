<template>
  <h1>Authorize</h1>
  <form class="authorization-form">
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
    emits: ['authorized'],
    methods: {
      async enterRoom(){
        const info = {
          name: this.name,
          room: this.room
        }
        let response = await fetch(`http://${SERVER_URL}/enter`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json;charset=utf-8'
          },
          body: JSON.stringify(info)
        })
        response.ok?
          this.$emit('authorized', info):
          response.json().then(e => alert(e.err))
      }
    }
  }
</script>
