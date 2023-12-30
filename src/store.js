import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      errors: [],
      historique: JSON.parse(localStorage.getItem('historique')) || [],
      stats: JSON.parse(localStorage.getItem('stats')) || { tpsmoy: 0, tentativesmoy: 0, pourcenV: 0 }
    };
  },
  mutations: {
    addGame(state, etat_jeux) {
      state.historique.unshift(etat_jeux);
      localStorage.setItem('historique', JSON.stringify(state.historique));
      store.commit('calculStats',state.historique)

    },

    calculStats(state,hist){
        var tabcalcul = []
        var nbvic = 0
        var tabtime = []
        hist.forEach((etat) => {
            tabcalcul.push(etat.data.tentatives)
            tabtime.push(etat.data.tempsNomb)
            if(etat.label === "gagne"){
                nbvic += 1 ;
            }
        } )
        const somme = tabcalcul.reduce((total, valeur) => total + valeur, 0);
        const moyenne = somme / tabcalcul.length;
        state.stats.tentativesmoy = Math.round(moyenne);
        state.stats.pourcenV = Math.round((nbvic / hist.length) * 100);
        const sommetemps = tabtime.reduce((total,valeur)=> total + valeur , 0);
        const moyennetemps = sommetemps / tabtime.length;
        const moyennetempstominute = moyennetemps / (60 * 1000);
        state.stats.tpsmoy = Math.round(moyennetempstominute);
        localStorage.setItem('stats', JSON.stringify({ tpsmoy:   state.stats.tpsmoy, tentativesmoy: state.stats.tentativesmoy, pourcenV:  state.stats.pourcenV }));

    }
  }
});
