<template>
  <div class="container">
    <AuthorizationForm v-if="!isAuthorized" @authorized="authorize"></AuthorizationForm>
    <Chat v-else-if="isAuthorized" :="userInfo" @unauthorized="unauthorize"></Chat>
  </div>
</template>

<script>
  import AuthorizationForm from './components/AuthorizationForm.vue'
  import Chat from './components/Chat.vue'

  export default {
    name: 'App',
    components: {
      AuthorizationForm,
      Chat
    },
    data: () => ({
      isAuthorized: false,
      userInfo: { name: '', room: '' }
    }),
    methods: {
      authorize(info){
        this.isAuthorized = true
        this.userInfo = info
      },
      unauthorize(){
        this.isAuthorized = false
        this.userInfo = { name: '', room: '' }
      }
    }
  }
</script>

<style lang="sass">
  .container
    height: 100vh
    width: 500px
    margin: 0 auto
  h1
    text-align: center
</style>