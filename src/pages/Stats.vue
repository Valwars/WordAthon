<template>
  <router-link class="givup" to="/">Retourner à l'accueil</router-link>
  <div class="main">
    <div class="head">
      <button class="select" @click="changerOnglet('historique')" :class="{ active: ongletActif === 'historique' }">Historique</button>
      <button class="select" @click="changerOnglet('statistiques')" :class="{ active: ongletActif === 'statistiques' }">Statistiques</button>
    </div>

    <div class="onglet" v-if="ongletActif === 'statistiques'">
      <div class="titres">
        <label @click="focused(0)" :class="{choix: onglet === 0}">Temps moyen de jeu : <span>{{tempsM}} minutes</span></label>
        <label @click="focused(1)" :class="{choix: onglet === 1}">Nombre de tentatives moyenne : <span>{{tentativesM}}</span></label>
        <label @click="focused(2)" :class="{choix: onglet === 2}">% de victoires : <span>{{ pourcenVic }}%</span></label>
      </div>
    </div>

    <Graphique :chartData="data" :chartLabels="labels" v-if="ongletActif==='statistiques' && onglet === 0 " />
    <Graphique :chartData="data" :chartLabels="labels" v-if="ongletActif==='statistiques' && onglet === 1 " />
    <Graphique :chartData="data" :chartLabels="labels" v-if="ongletActif==='statistiques' && onglet === 2 " />

    <div class="onglet histo" v-if="ongletActif === 'historique'">
      <Historique/>
    </div>
  </div>
</template>

<script>
import Graphique from '../components/historique/Graphique.vue';
import Historique from '../components/historique/Historique.vue';

export default {
  name: 'Stats',
  components: {
    Graphique,
    Historique
  },
  data: function() {
    return {
      ongletActif: "historique",
      data: [],
      labels: [],
      onglet: 0,
      tentativesM: 0,
      pourcenVic: 0,
      tempsM: 0
    }
  },
  beforeMount() {
    const { tpsmoy, tentativesmoy, pourcenV } = this.$store.state.stats;
    this.tempsM = tpsmoy;
    this.tentativesM = tentativesmoy;
    this.pourcenVic = pourcenV;
    this.dataToGraph(0);
  },
  methods: {
    dataToGraph(index) {

      const data = [...this.$store.state.historique]?.reverse();
      var toutemps = [];
      var toutetentatives = [];
      var toutevictoires = [];
      this.labels = [];

      if(index == 0){
        data.forEach((element)=>{
          var tranform = element.data.tempsNomb / (60 * 1000);
          toutemps.push(tranform);
        });
        this.data = toutemps;
      } else if (index == 1){
        data.forEach((element)=>{
          toutetentatives.push(element.data.tentatives);
        });
        this.data = toutetentatives;
      } else if(index == 2){
        data.forEach((element)=>{
          if(element.label === 'gagne'){
            toutevictoires.push(1);
          }else if(element.label == 'perdu'){
            toutevictoires.push(0);
          }
        });
        this.data = toutevictoires;
      }
      for(let i = 0; i < data.length ; i++){
        this.labels.push(i);
      }
    },
    focused: function(index){
      this.dataToGraph(index);
      this.onglet = index;
    },
    changerOnglet(onglet) {
      this.ongletActif = onglet;
    }
  }
}
</script>

<style scoped>

.main{
  border: 2px solid rgba(179, 146, 240, 0.4);
  width: 95%;
  position: absolute;
  height: clamp(500px, 85vh, 1500px);
  top: 12%;
  left: 50%;
  transform: translate(-50%);
  border-radius: 5px;
  padding: 20px;
  background: rgba(31, 36, 40, 0.78);
  display: flex;
  flex-direction: column;
}

.onglet{
  width: 100%;
  border-top: 1px solid var(--purple);
  margin: auto;
  padding: 20px 0;

}

.titres{
  display: flex;

}

.titres label{
  font-size: 12px;
  font-weight: bold;
  margin: auto;
  width: fit-content;
  color: white;
  border-bottom: 2px solid transparent;
  padding-bottom: 5px;
  cursor: pointer;

  transition: 0.2s;
}

.titres label span{
  color: var(--orange);
}
.titres label.choix{
  border-color: var(--blue);
  
  }


.select{
  border: none;
  background: none;
  color: white;
}
.select.active{
color: var(--blue);
}

.head{
  display: flex;
  margin: auto;
  gap: 100px;
  align-items: center;
  padding-bottom: 20px;

}
.head button{
  margin: auto;
  font-weight: bold;
  font-size: 18px;
}



button:focus{
  outline: none;
}

.head button:hover{
  color: var(--blue)
}

.histo{
  height: 100%;
  display: flex;
}

</style>

