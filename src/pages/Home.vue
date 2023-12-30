<template>
  <div class="container">
    <span class="usernames">TPA51 : Valentin MERAULT - Tom ROMANO - Josian RIVIERE </span>
    <h1>Word<span>Athon</span></h1>
    <div class="btn-container">
      <router-link to="/history">Consulter parties précédentes</router-link>
      <router-link to="/game">Démarrer une partie</router-link>
    </div>
  </div>
</template>

<style>

.container{
  width: fit-content;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.btn-container{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

a{
  background-color: var(--bloc-bg);
  color: var(--txt-color);
  border-radius: 10px;
  padding: 10px 20px;
  border: 2px solid var(--orange);
  transition: all 0.3s;
  text-decoration: none;
  
}

a:focus{
  outline: none;
}

.btn-container a:nth-child(2){
  border-color: var(--blue);
}
a:hover,.btn-container a:hover {
  border-color: var(--purple);
  text-decoration: none;
  color: var(--txt-color);

}

.usernames{
  color: var(--txt-color);
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 12px;
}
</style>