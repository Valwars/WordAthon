<template>
  <div class="vide" v-if="historique.length === 0">
    <h2>Aucune partie jouée</h2>
  </div>
<div v-else class="liste">

  <div class="partie" :class="h.label" v-for="(h, i) in historique" @click="affichergrilletentative(h,i)">
    <div :class="{active: i === this.index}">
      <p >
        <span class="mot">{{ h.data.mot }}</span>  {{h.label}} en <span >{{ h.data.tentatives }} tentatives</span >  et <span class="temps">{{ h.data.temps }}</span>
      </p>
      <p> {{h.data.date}}</p>
    
    </div>
   
  </div>
</div>

  <div class="grille" v-if="cellule != undefined">
    <h4>Grille de la partie</h4>
    <GrilleHistorique :cells="cellule" :errors="errors" :isWin="this.historique[this.index].label"/>
  </div>
</template>

<script >
import GrilleHistorique from '../historique/GrilleHistorique.vue';

export default {
  name : 'Historique',
components : {
  GrilleHistorique
},

  data :function(){
    return{
   historique : [],
     cellule : undefined,
      index : 0,
      errors : []
    }
  },

  mounted(){
    this.historique = [...this.$store.state.historique];
    const element_zero = this.historique[0]
    if(element_zero){
     this.cellule = element_zero.grille;
     this.errors = element_zero.data.errors
   }

  },

  methods : {
    affichergrilletentative(objet, i){
    this.index = i;
    this.cellule = objet.grille;
    this.errors = objet.data.errors;


    }
  }
}

</script>

<style scoped>
.liste{
  max-width:40%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap:20px;
  width: fit-content;
  padding-left:10px ;
  max-height:95%;
  overflow-y: scroll;
}

.liste p {
  width: 100%;
  margin-bottom: 0;

}
.vide{
  position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%);
  color: var(--orange);
  text-align: center;
}
.liste div{
  cursor: pointer;
  transition: 0.2s;
}
.liste div {
  padding-right: 10px;
}
.liste > div:hover {
  opacity: 0.8;

}
.liste > div:hover div{
  border-right: 3px solid var(--blue);

}
.liste .active{
  margin: auto;
  border-right: 3px solid var(--blue);
  height: fit-content;
  ;
}
.liste p:nth-child(2){
  margin-top: 5px;
  font-size: 14px;
  opacity: 0.8;
}
.partie{
  padding: 30px;
  height: fit-content;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: var(--bloc-bg);
  border-radius: 10px;
 
}

.partie .mot{
  color:var(--purple)
}
.partie span{
  color: var(--orange);
  font-weight:bold;
}

.temps{
  color: var(--blue) !important;
}
.partie.gagne{
  border-left: 10px solid #8AE950;
}

.partie.perdu{
  border-left: 10px solid #F00;
}
.grille{
  display: flex;
  width: 50%;
  height: 95%;

 margin: auto;
 align-items: center;
 justify-content: center;
 flex-direction: column;
   box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: var(--bloc-bg);
  border-radius: 10px;
}
.grille h4{
  margin-bottom: 20px;
}



</style>