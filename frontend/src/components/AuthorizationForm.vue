<template>
  <form action="localhost:3000/enter" method="post">
    <h1>Authorize</h1>
    <input name="name" id="name" type="text" v-model="name" placeholder="name">
    <button type="submit">Enter</button>
  </form>
</template>

<script>
export default {
  name: "AuthorizationForm",
  data: () => ({
    name: '',
  }),
  methods: {

  }
}
</script>
