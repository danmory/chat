<template>
  <AuthorizationForm v-if="!isAuthorized"></AuthorizationForm>
</template>

<script>
    import AuthorizationForm from './components/AuthorizationForm.vue'

    export default {
      name: 'App',
      components: {
        AuthorizationForm
      },
      data: () => ({
        isAuthorized: false
      })
    }
</script>

