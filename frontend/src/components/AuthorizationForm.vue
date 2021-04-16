<template>
  <h1>Authorization</h1>
  <form class="authorization-form">
    <input name="name" id="name" type="text" v-model="name" placeholder="enter your name">
    <input name="room" id="room" type="text" v-model="room" placeholder="enter room">
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

<style lang="sass" scoped>
  h1
    width: 50%
    margin: 0 auto
    text-align: center
    position: relative
    top: 45%

  .authorization-form
    position: relative
    top: 45%
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    input, button
      margin-top: 10px
    input
      border: none
      outline: none
      border-bottom: 1px solid black
      transition: border-bottom-color ease-out
    input:focus
      border-bottom-color: blue
</style>