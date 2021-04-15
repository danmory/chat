<template>
  <form class="chat-input">
    <input type="text" name="message" v-model="message">
    <button type="button" @click="sendMessage">Send</button>
  </form>
</template>

<script>
  export default {
    name: 'ChatInput',
    props: ['socket', 'room', 'name'],
    data: () => ({
      message: ''
    }),
    methods: {
      sendMessage(){
        const sending = { name: this.name, room: this.room, message: this.message }
        this.socket.send(JSON.stringify(sending))
        this.message = ''
      }
    }
  }
</script>