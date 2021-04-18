<template>
  <div class="chat">
    <h1>Chat</h1>
    <ChatMessages :socket="socket"></ChatMessages>
    <ChatInput :socket="socket" :name="name" :room="room"></ChatInput>
  </div>
</template>

<script>
  import {SERVER_URL} from '../utils'
  import ChatInput from './ChatInput.vue'
  import ChatMessages from './ChatMessages.vue'

  export default {
    name: 'Chat',
    components: { ChatInput, ChatMessages },
    data: () => ({
      socket: {}
    }),
    emits: ['unauthorized'],
    props: ['name', 'room'],
    created() {
      this.init_sock()
    },
    unmounted() {
      this.close_sock()
    },
    methods: {
      init_sock(){
        this.socket = new WebSocket(`ws://${SERVER_URL}/${this.name}&${this.room}`)
        this.socket.onopen = () => alert('connection established')
        this.socket.onclose = () => {
          alert('connection closed')
          this.$emit('unauthorized')
        }
        this.socket.onerror = (err) => alert(`error: ${err}`)
      },
      close_sock(){
        this.socket.close(1000, 'disconnected')
        this.$emit('unauthorized')
      }
    }
  }
</script>

<style lang="sass" scoped>
  .chat
    height: 100vh
    display: grid
    grid-template-rows: 50px 1fr 20px
    h1
      margin: 0
</style>