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
          alert('Something wrong happened')
      }
    }
  }
</script>
