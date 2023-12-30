<template>
<div class="popUp">
    <div class="content">
        <h3>Vous avez perdu, le mot à trouver était <span>{{ word }}</span> !</h3>
        <h4><span>{{ number }} </span> tentatives</h4>
        <p>Retournez à l'accueil pour retenter votre chance !</p>
        <router-link to="/">Retourner à l'accueil</router-link>
    </div>
</div>
</template>


<script>
export default {
    props: {
        number: Number,
        word : String
  },
};
</script>

<style>

.popUp{
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(36, 41, 47, 0.58);
    opacity: 0;
    z-index: 1;
    animation: animatepopUp 0.2s ease-in forwards;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
@keyframes animatepopUp {
   
    0%{
        opacity: 0;

    }
    100%{
       opacity: 1;
    }
}

.popUp .content{
    background-color: var(--bloc-bg);
    padding: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
</style>