<template>
  <AuthorizationForm v-if="!isAuthorized" @authorized="authorize"></AuthorizationForm>
  <Chat v-else-if="isAuthorized"></Chat>
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
      userInfo: {}
    }),
    methods: {
      authorize(info){
        this.isAuthorized = true
        this.userInfo = info
      }
    }
  }
</script>

