<template>
  <Loading v-if="!word"/>

   <Timer ref="myTimer" @timerZero="handleTimerZero" />

  <div class="game-container">

    <button class="givup" v-on:click="ff()">Abandonner</button>
    <h2>Word<span>Athon</span>       <span class="loader" v-if="loading"><span class="loader-inner"></span></span>    </h2>
      <Grid :cells="cells" :currentColumn="currentColumn" :currentRow="currentRow" :errors="errors" :error="error" :statement="statement"/>
    <Loose v-if="statement === 'loose'" :number="this.countTry " :word="word"/>
    <Win v-if="statement === 'win'"  :number="this.countTry " :word="word" :tempsF="tempsF"/>
    <Keyboard @caractereClique="handleKeydown" :lastLettre="this.lastL" :globalData="this.globalData" />


          <div class="message" v-if="message">{{message}}</div>
    

  </div>
</template>

<script>
import { makeApiRequest } from '../utils/api';
import confetti from 'canvas-confetti'; // Importez canvas-confetti

import Timer from "../components/game/Timer.vue"
import Grid from '../components/game/Grid.vue';
import Keyboard from '../components/game/Keyboard.vue';

import Loose from "../components/game/PopUps/Loose.vue";
import Win from "../components/game/PopUps/Win.vue"
import Loading from "../components/loading/Loading.vue"

export default {
  components: {
    Keyboard,
    Timer,
    Grid,
    Loose,
    Win,
    Loading
  },
  data:function() {
    return {
      cells: Array(6).fill().map(() => Array(5).fill("")),
      currentColumn: 0,
      countTry : 0,
      currentRow: 0,
      word: "",
      statement: "game",
      errors: [],
      lastL: '',
      error: false,
      globalData: { wins: [], looses: [], mids: [] },
      message : "",
      loading : false,
      etat_jeux : {
        label : "",
        index : 0,
        grille : [],
        data : {
          errors: [],
          mot : "",
          tentatives : 0,
          temps : "",
          tempsNomb : 0,
          date : ""
        }
      },
      tempsF : undefined,
    };
  },


  async mounted() {

    const wordFromApi = await makeApiRequest("GET");
    if (wordFromApi) {
      this.word = wordFromApi.toUpperCase();
      console.log(this.word)
    }

    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
      enregistrement(label){

        var date = new Date().toLocaleDateString('fr-FR', { day:"numeric", month:"long", year:"numeric" })
        this.etat_jeux.label = label
        this.etat_jeux.data.mot = this.word
        this.etat_jeux.data.date = date
        this.etat_jeux.data.tentatives = this.countTry
        this.etat_jeux.grille = this.cells
        this.etat_jeux.data.errors = this.errors;
        this.$refs.myTimer.pauseTimer(); // Mettre en pause le timer
        const currentTime = this.$refs.myTimer.getTime(); // Récupérer la valeur du timer
      const timePassed = (10 * 60 * 1000)- (currentTime.minutes * 60 * 1000 + currentTime.seconds * 1000 + currentTime.milliseconds);
      // timePassed est a enregistrer dans l'histo.
        this.etat_jeux.data.tempsNomb = timePassed
      this.tempsF = this.formatTime(timePassed);
      this.etat_jeux.data.temps = this.formatTime(timePassed)
      this.$store.commit('addGame', {...this.etat_jeux});

      },

    ff() {
      this.statement = "loose"
        this.enregistrement("perdu")
        
    },

    launchConfetti() {
      confetti({
        particleCount: 200,
        spread: 200,
        origin: { y: 0.8 },
        startVelocity: 60,

        // Augmentez pour une plus grande vitesse initiale

      });
    },

    async handleKeydown(event) {

      if (this.statement !== "game") {
        return
      }
      // Passer à la ligne suivante avec Entrée
      if (event.key === 'Enter' && this.currentColumn == 4 && this.cells[this.currentRow][this.currentColumn]) {
        this.countTry += 1
        this.loading = true

        this.lastL = 'Enter'
        const currentWord = this.cells[this.currentRow].join('');

        const isValid = await makeApiRequest("POST", currentWord);
        this.loading = false

        if (isValid && currentWord === this.word) {
          this.statement = "win"
            this.enregistrement("gagne")
           
          setTimeout(() => {
            this.launchConfetti(); // Lancez des confettis

          }, 1300)

          return
        }else if(!isValid){
          this.error = true
          if(!this.message){
            this.message = "Mot invalide."
            setTimeout(() => {
            this.message = ""

          },2000)
          }
          setTimeout(() => {
            this.error = false

          }, 400)

          return;
        }

        if (this.isRowFilled(this.cells[this.currentRow]) && this.currentRow < this.cells.length - 1) {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 400)
          
          this.currentRow++;
          this.currentColumn = 0;
          this.errors.push(this.wordVerification(currentWord))

        }

        if (this.currentRow === this.cells.length - 1 && this.currentColumn === this.cells[0].length - 1 && this.cells[this.currentRow][this.currentColumn] !== "") {
          // PERDU
          this.statement = "loose"
            this.enregistrement("perdu")
           
        }
        return;
      }

      // Effacer uniquement dans la ligne courante
      if (event.key === 'Backspace') {
        this.lastL = 'Backspace'
        if (this.currentColumn > 0) {
          if (this.cells[this.currentRow][this.currentColumn] === "") {
            this.currentColumn -= 1;
          }
          this.cells[this.currentRow][this.currentColumn] = "";
        }
        return;
      }

      // Gérer les lettres
      if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        this.lastL = event.key.toUpperCase();
        if (this.currentColumn < this.cells[0].length) {
          this.cells[this.currentRow][this.currentColumn] = event.key.toUpperCase();
          if (this.currentColumn < this.cells[0].length - 1) {
            this.currentColumn++;
          }
        }
      }
    },
    isRowFilled(row) {
      return row.every(cell => cell !== "");
    },

    //Vérification du mot et de chaques lettres
    wordVerification(attempt) {
      const tabWord = attempt.split('');
      let tabAnswer = this.word.split('');
      const res = { wins: [], mids: [], loses: [] };

      // Vérification des lettres bien placées
      tabWord.forEach((lettre, index) => {
        if (lettre === tabAnswer[index]) {
          res.wins.push(index);
          this.globalData.wins.push(lettre)
          tabAnswer[index] = null; // Marquer la lettre comme traitée
        }
      });

      // Vérification des lettres mal placées ou incorrectes
      tabWord.forEach((lettre, index) => {
        if (!res.wins.includes(index)) {
          const answerIndex = tabAnswer.indexOf(lettre);

          if (answerIndex !== -1) {
            if (tabAnswer[index] !== null) {
              this.globalData.mids.push(lettre)
              res.mids.push(index)
            }
          } else {
            res.loses.push(index)
            this.globalData.looses.push(lettre)

          }
        }
      });
    return res
    },
    formatTime(milliseconds) {
  let seconds = Math.floor((milliseconds / 1000) % 60);
  let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return minutes + " minutes, " + seconds + " secondes";
},



    //timer à 0 donc loose:
    handleTimerZero() {
      // Mettre à jour le statut (statement) lorsque le timer atteint zéro
      this.statement = "loose"; // Ou tout autre état souhaité
      this.enregistrement("perdu")
     
    },
    async recevoirCaractere(caractere) {
     if(this.statement !== "game"){
        return
      }
        // Passer à la ligne suivante avec Entrée
        if (caractere === 'Enter' && this.currentColumn == 4) {
          const currentWord = this.cells[this.currentRow].join('');

          const isValid = await makeApiRequest("POST", currentWord);

          if(isValid && currentWord === this.word){
            this.statement = "win"
            this.launchConfetti(); // Lancez des confettis

            return
          }
           if (this.isRowFilled(this.cells[this.currentRow]) && this.currentRow < this.cells.length - 1) {
            this.currentRow++;
            this.currentColumn = 0;
            this.errors.push(this.wordVerification(currentWord))

          }

          if(this.currentRow === this.cells.length-1 && this.currentColumn === this.cells[0].length - 1 &&this.cells[this.currentRow][this.currentColumn] !== "" ){
            // PERDU
            this.statement = "loose"
          }
          return;
        } else {

        }
  if (caractere === 'Backspace') {
          if (this.currentColumn > 0) {
              if( this.cells[this.currentRow][this.currentColumn] === "" ){
                  this.currentColumn -= 1;
              }
            this.cells[this.currentRow][this.currentColumn] = "";
          }
          return;
        }
 if (caractere.match(/[A-Z]/)) {
          if(caractere != 'Enter'){
             if(this.currentColumn < this.cells[0].length) {
            this.cells[this.currentRow][this.currentColumn] = caractere;
            if (this.currentColumn < this.cells[0].length - 1) {
              this.currentColumn++;
            }
          }
          }

        }
    },
},

}

</script>


<style>
.game-container {
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.game-container h2 {
  text-align: left;

  font-weight: bold;
  position: absolute;
  top: 35px;
}

.givup {
  position: absolute;
  top: 30px;
  left: 30px;
}

.givup {
  background-color: var(--bloc-bg);
  color: var(--txt-color);
  border-radius: 10px;
  padding: 10px 20px;
  border: 2px solid var(--orange);
  transition: all 0.3s;
  text-decoration: none;
}

.givup:focus {
  outline: none;
}

.givup:nth-child(2) {
  border-color: var(--blue);
}

.givup:hover {
  border-color: var(--purple);
  text-decoration: none;
  color: var(--txt-color);

}

.message{
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(36, 41, 47, 0.80);
  padding: 10px 40px;
  border-radius: 10px;
  border: 2px solid #E94646;
  animation: displayError 2s ease-in-out;
}

@keyframes displayError {
  0%{
    opacity: 0;
    top: -50px;
  }
  10%{
    opacity: 1;
    top: 40px;
  }

  90%{
    opacity: 1;
    top: 40px;
  }
  100%{
    opacity: 0;
    top: -50px;
  }
}
.loader {
  position: absolute;
  display: inline-block;
  width: 25px;
  height: 25px;
  right: -50px;
  top: 25%;
  border: 4px solid #9B87FE;
  animation: loader 2s infinite ease;
}

.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #FFB870;
  animation: loader-inner 2s infinite ease-in;
}

@keyframes loader {
  0% {
      transform: rotate(0deg);
  }
  25% {
      transform: rotate(180deg);
  }
  50% {
      transform: rotate(180deg);
  }
  75% {
      transform: rotate(360deg);
  }
  100% {
      transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
      height: 0%;
  }
  25% {
      height: 0%;
  }
  50% {
      height: 100%;
  }
  75% {
      height: 100%;
  }
  100% {
      height: 0%;
  }
}
</style>