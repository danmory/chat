<template>
  <div class="chat-messages">
    <p v-if="messages.length === 0">No messages yet..</p>
    <p class="message" v-for="m in messages">{{m.name}} says: {{m.message}}</p>
  </div>
</template>

<script>
  export default {
    name: 'ChatMessages',
    props: ['socket'],
    data: () => ({
      messages: [] // one message is in format {name: 'sender_name', message: 'sender message' }
    }),
    created() {
      this.init()
    },
    methods: {
      init(){
        this.socket.onmessage = (message) => this.messages.push(JSON.parse(message.data))
      }
    }
  }
</script>

<style lang="sass" scoped>
  .chat-messages
    margin-top: 60px
    .message
      border: 1px solid blue
      border-radius: 50%
      padding: 3px
      text-align: center
      width: 400px
      overflow: hidden
</style>