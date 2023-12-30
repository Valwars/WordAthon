<template>
  <div class="grid" :class="{'error': error, 'win': statement === 'win'}">
    <!-- Boucle pour les lignes -->
    <div v-for="(row, rowIndex) in cells" :key="rowIndex" class="row" :class="{'row-filled': isRowFilled(row) && rowIndex < currentRow  , 'current-row': rowIndex === currentRow }">
      <!-- Boucle pour les cases dans chaque ligne -->
      <div v-for="(cell, colIndex) in row" :key="colIndex" :class="
      {
        'case': true, 
        'current-case': rowIndex === currentRow && colIndex <= currentColumn,
        'win-case': errors[rowIndex] && errors[rowIndex].wins.includes(colIndex),
        'mid-case': errors[rowIndex] && errors[rowIndex].mids.includes(colIndex),

      }">
        {{ cell }}
      </div>
    </div>
  </div>
  
</template>
<script>

export default {
props: {
  cells: Array,
  currentColumn: Number,
  currentRow: Number,
  errors : Array,
  error : Boolean,
  statement : String,
},
methods: {
  isRowFilled(row) {
    return row.every(cell => cell !== "");
  },

}
};
</script>


<style>
.grid {
  width: fit-content;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ;
  margin-top: 100px;

}

.row {
  display: contents;
  margin: 0;
  display: flex;
  flex-direction: row;
}

.case {
  border-radius: 10px;
  border: 2px solid rgba(179, 146, 240, 0.40);
  background: #1F2428;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px; /* Largeur fixe pour les cases */
  height: 60px; /* Hauteur fixe pour les cases */
  transition: all 0.2s;
  margin: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}


.case.current-case  {
  border-color: #79B8FF;
  transform: translate3d(0px, 0px, 0px) scale3d(1.1, 1.1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;

}
.row-filled > .case{
  border-color: var(--purple);
}

.case.win-case{
  border-color: #8AE950;
}

.case.mid-case{
  border-color: var(--orange);
}


.grid.error{
  animation: shake 0.4s ease-in;
}
.grid.error .case{
  border-color: #E94646;

}

.grid.win .case.current-case{
animation: win 0.3s ease-in-out forwards, BUMP 0.3s 1.2s ease-in-out ;

}

.grid.win .case.current-case:nth-child(2){
animation: win 0.3s 0.1s ease-in-out forwards, BUMP 0.3s 1.2s ease-in-out 
}
.grid.win .case.current-case:nth-child(3){
animation: win 0.3s 0.2s ease-in-out forwards, BUMP 0.3s 1.2s ease-in-out 
}
.grid.win .case.current-case:nth-child(4){
animation: win 0.3s 0.3s ease-in-out forwards, BUMP 0.3s 1.2s ease-in-out 
}
.grid.win .case.current-case:nth-child(5){
animation: win 0.3s 0.4s ease-in-out forwards, BUMP 0.3s 1.2s ease-in-out 
}
.grid.win .case.current-case:nth-child(6){
animation: win 0.3s 0.5s ease-in-out forwards, BUMP 0.3s 1.2s ease-in-out 
}

@keyframes win {
0%{
  border-color: #79B8FF;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
}
50%{
  border-color: #8AE950;

  transform: translate3d(0px, 0px, 0px) scale3d(1.4, 1.4, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
}
100%{
  border-color: #8AE950;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  
}
}

@keyframes BUMP {
0%{
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
}
50%{

  transform: translate3d(0px, 0px, 0px) scale3d(1.4, 1.4, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
}
100%{
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  
}
} 

@keyframes shake {
0% { transform: translate(1px, 1px) rotate(0deg); }
10% { transform: translate(-1px, -2px) rotate(-1deg); }
20% { transform: translate(-3px, 0px) rotate(1deg); }
30% { transform: translate(3px, 2px) rotate(0deg); }
40% { transform: translate(1px, -1px) rotate(1deg); }
50% { transform: translate(-1px, 2px) rotate(-1deg); }
60% { transform: translate(-3px, 1px) rotate(0deg); }
70% { transform: translate(3px, 1px) rotate(-1deg); }
80% { transform: translate(-1px, -1px) rotate(1deg); }
90% { transform: translate(1px, 2px) rotate(0deg); }
100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>