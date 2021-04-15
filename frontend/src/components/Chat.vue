<template>
  <h1>Chat</h1>
  <ChatMessages :socket="socket"></ChatMessages>
  <ChatInput :socket="socket" :name="name" :room="room"></ChatInput>
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
        this.socket = new WebSocket(`ws://${SERVER_URL}/${this.room}`)
        this.socket.onopen = () => alert('connection established')
        this.socket.onclose = () => {
          alert('closed')
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