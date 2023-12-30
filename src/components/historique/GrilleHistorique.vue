<template>
  <div class="grid grilleHisto" :class="isWin">
    <!-- Boucle pour les lignes -->
    <div v-for="(row, rowIndex) in cells" :key="rowIndex" class="row" 
    
    :class="{
      'row': true,
      'row-filled': isRowFilled(row),
      'last-filled-row': isLastFilledRow(rowIndex) && isWin === 'gagne'
    }">
      <!-- Boucle pour les cases dans chaque ligne -->
      <div v-for="(cell, colIndex) in row" :key="colIndex" :class="
      {
        'case': true,
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
props:{
  cells: Array,
  errors : Array,
  error : Boolean,
  isWin : String
},

methods: {
  isRowFilled(row) {
    return row.every(cell => cell !== "");
  },
  isLastFilledRow(index) {
    let lastFilledIndex = -1;
    for (let i = 0; i < this.cells.length; i++) {
      if (this.isRowFilled(this.cells[i])) {
        lastFilledIndex = i;
      }
    }
    return index === lastFilledIndex;
  },

}
};
</script>


<style>


.grid.grilleHisto{
  margin: 0;
}

.grilleHisto.gagne .last-filled-row .case {
 border: 3px solid #8AE950 !important;
}

@media (max-width : 795px) {
  .histo{
    flex-direction: column-reverse !important;
    height: fit-content !important;
  }
  .histo .grille{
    width: 100% !important;
    height: fit-content !important;
    padding: 20px 0;
  }

  .histo .liste{
   max-width: none !important;
   height: fit-content !important;
   max-height: 400px !important;
   margin-top: 50px;
   
  }

  .main{
    height: fit-content !important;
  }
  .histo{
    min-height: 200px;
  }
}


</style>