<template>
  <div class="chat-messages">
    <p v-for="m in messages">{{m.user}} says: {{m.message}}</p>
  </div>
</template>

<script>
  export default {
    name: 'ChatMessages',
    props: ['socket'],
    data: () => ({
      messages: []
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