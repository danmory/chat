<template>
  <form action="localhost:3000/enter" method="post">
    <h1>Authorize</h1>
    <input name="name" id="name" type="text" v-model="name" placeholder="name">
    <input name="room" id="room" type="text" v-model="room" placeholder="room">
    <button type="submit">Enter</button>
  </form>
</template>

<script>
export default {
  name: "AuthorizationForm",
  data: () => ({
    name: '',
    room: ''
  }),
  methods: {

  }
}
</script>
