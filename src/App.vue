<template>
  <div class="App">
    <router-view>
    </router-view>
    <Background/>
  </div>
</template>

<script>

import Background from './components/Background.vue';


export default {
  components: {
    Background
  }
};
</script>

<style>

:root{
  --bg-color : #24292F;
  --bloc-bg : #1F2428;
  --orange : #E98750;
  --blue : #79B8FF;
  --purple : #B392F0;
  --txt-color : white
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  background-color: var(--bg-color);
  color: var(--txt-color);
}

.App{
  height: 100vh;
}
h1{
  font-size: 64px;
  font-weight: bold;
}

span{
  color: var(--purple);
}
</style>
