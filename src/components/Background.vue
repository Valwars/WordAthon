

<template>
    <ul class="circles">
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>I</li>
        <li>J</li>
    </ul>
  </template>
  
<style>
.circles {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  border-radius: 30px;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.circles li {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  font-weight: bold;
  position: relative;
  list-style: none;
  width: 80px;
  height: 80px;
  background: var(--orange);
  animation: animate 15s linear infinite;
  bottom: -100%;
  left: -80%;
}

.circles li:nth-child(odd){
  background-color: var(--blue);
}

.circles li:nth-child(1) {
  left: 25%;
 
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
  
  }
  100% {
      transform: translateY(-1500px) rotate(720deg);
      opacity: 0.3;
      
  }
}
</style>