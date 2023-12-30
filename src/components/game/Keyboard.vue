<template>

  <div class='keyboard'>
      <button class="key" v-for="t in touches" :name="t" :key="t" @click="envoyerCaractere(t)" 
      :class="{
      'win' : isIn(t,globalData?.wins), 
      'mid' :  isIn(t,globalData?.mids),  
      'loose' : isIn(t,globalData?.looses)}">
  
            <ion-icon v-if="t === 'Backspace'" name="backspace-outline"></ion-icon>
  
          <ion-icon v-else-if="t === 'Enter'" name="return-down-back-outline" ></ion-icon>
  
        {{ t !== 'Backspace' && t !== 'Enter' ? t : '' }}
      </button>

    </div>
  
  </template>
  
  
  <script>
  
  export default {
      name : 'Keyboard',
  
      data : function() {
          return {
              touches : ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M','Enter', 'W', 'X', 'C', 'V', 'B', 'N', 'Backspace'],
             dragging: false,
        position: { top: 95, left: 0 },
        offset: { x: 0, y: 0 },
          laslet : ''
          }
  
      },
    props: {
      lastLettre : String,
      globalData : {
        type: Object,


        default(rawProps) {
        return { wins : [], looses : [], mids : [] }
        }
      },
    },
    watch: {
      lastLettre(newData, oldData) {
       this.laslet = newData
        this.activation(newData)
        this.laslet =''
      },
    },
  
    methods : {
        activation(caractere){
            this.$nextTick(() => {
              const boutonSelectionne = document.querySelector(`.key[name='${caractere}']`);
     boutonSelectionne.classList.add("active")
  
             setTimeout(() => {
    boutonSelectionne.classList.remove('active');
  }, 500);
           })
  
        },
          
    
      envoyerCaractere(caractere){
              this.$emit('caractereClique', {key: caractere});
      },
      isIn(caractere, tab){
        return tab?.includes(caractere)
      }
  
    }
  
  }
  
  </script>
  
  
  <style scoped>
  button:focus{
    outline: none;
  }
  .keyboard{
    position: fixed;
    bottom: 50px;
    margin: auto;
    display:grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(3,1fr);
    column-gap: 0.1vw;
    align-items: center;
    justify-content: center;
  }
  
  .grainy-background div{
    position: relative;
    top: 0;
    left: 50%;
    width: 35%;
    height: 10px;
    transform: translate(-50%);
    background-color: var(--bloc-bg);
    border-radius: 20px;
  }
  
  .key{
      width: fit-content;
      font-size: 18px;
      font-weight: bold;
      border-radius: 10px;
      color:white;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px;
      background-color: var(--bloc-bg);
      border: 1px solid rgba(255, 255, 255, 0.50);
      margin: 3px 0;
      transition: 0.2s all;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  }
  
  .key ion-icon{
    font-size: 18px;
  
  }
  
  .key:is([name='Backspace'],[name='Enter']){
    width: 200%;
    height: 90%;
    margin: auto;
  }

  .key:nth-child(21) {
    grid-column-start: 1; /* Démarre à partir de la deuxième colonne */
}

.key:nth-child(22) {
    grid-column-start: 3; /* Démarre à partir de la troisième colonne */
}

.key:nth-child(23) {
    grid-column-start: 4; /* Démarre à partir de la quatrième colonne */
}

.key:hover {
    box-shadow: 0 0 2px 1px var(--blue); /* Couleur et taille de l'ombre à ajuster selon vos préférences */
}
  
.key.active{
  background-color : var(--blue);
  transform: translate3d(0px, 0px, 0px) scale3d(1.05, 1.05, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  border-bottom: none;

}

.key.win{
  border-color: #8AE950 !important;
}

.key.mid{
  border-color: var(--orange);
}


.key.loose{
  filter: blur(1.5px);
}
</style>
