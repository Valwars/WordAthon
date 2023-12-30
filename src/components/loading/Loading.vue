<template>

    <div class="popUp loading">
        <ul class="loading-circles">
            <li>L</li>
            <li>O</li>
            <li>A</li>
            <li>D</li>
            <li>I</li>
            <li>N</li>
            <li>G</li>
        </ul>
    </div>
</template>



<script>
export default {
   
};
</script>


<style>

.loading-circles{
    width: fit-content;
    position: relative;
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1000;
}

.loading-circles li {
        height: fit-content;
        position: relative;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        position: relative;
        list-style: none;
        width: 40px;
        height: 40px;
        background: #E98750;
        /* Ajout des animations */
        animation: changeColor 2s infinite, flip 2s infinite;
}

/* Définition de l'animation de changement de couleur */
@keyframes changeColor {
0%, 100% {
background: #E98750;
}
50% {
background: #7D7BE2;
}
}

/* Définition de l'animation de flip */
@keyframes flip {
0% {
transform: rotateX(0deg);
}

100% {
transform: rotateX(360deg);
}
}

/* Application des animations avec un délai différent pour chaque lettre */
.loading-circles li:nth-child(1) { animation-delay: 0s, 0s; }
.loading-circles li:nth-child(2) { animation-delay: 0.2s, 0.2s; }
.loading-circles li:nth-child(3) { animation-delay: 0.4s, 0.4s; }
.loading-circles li:nth-child(4) { animation-delay: 0.6s, 0.6s; }
.loading-circles li:nth-child(5) { animation-delay: 0.8s, 0.8s; }
.loading-circles li:nth-child(6) { animation-delay: 1s, 1s; }
.loading-circles li:nth-child(7) { animation-delay: 1.2s, 1.2s; }
.loading-circles li:nth-child(8) { animation-delay: 1.4s, 1.4s; }
.loading-circles li:nth-child(9) { animation-delay: 1.6s, 1.6s; }
.loading-circles li:nth-child(10) { animation-delay: 1.8s, 1.8s; }
</style>