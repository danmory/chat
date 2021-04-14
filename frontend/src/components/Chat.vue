<template>
  <h1>Chat</h1>
  <input type="text" name="msg" v-model="msg">
</template>

<script>
  import {SERVER_URL} from '../utils'

  export default {
    name: 'Chat',
    data: () => ({
      msg: ''
    }),
    props: ['name', 'room'],
    created() {
      this.init()
    },
    methods: {
      init(){
        let socket = new WebSocket(`ws://${SERVER_URL}`)
        socket.onopen = () => alert('open')
        socket.onerror = () => alert('error')
      }
    }
  }
</script>