<template>
  <div class="authorization">
    <h1>Authorization</h1>
    <form class="authorization-form">
      <input name="name" type="text" v-model="name" placeholder="enter your name">
      <input name="room" type="text" v-model="room" placeholder="enter room">
      <button type="button" @click="enterRoom">Enter</button>
    </form>
  </div>
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

<style lang="sass" scoped>
  .authorization
    position: relative
    top: 40%
    display: flex
    flex-direction: column
    justify-content: center
    .authorization-form
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      input
        margin-bottom: 10px
</style>