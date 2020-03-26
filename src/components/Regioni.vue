<template>
  <div class="columns">
    <div class="column is-one-third" id="selezione_regione">
      <!-- <b-field class="is-grouped is-grouped-centered"> -->
      <b-field class="is-grouped">
        <b-select placeholder="Seleziona una regione" v-model="picked">
          <option v-for="option in list_of_regioni" :value="option" :key="option">{{ option }}</option>
        </b-select></b-field><b-field>
                <b-select placeholder="Seleziona una data" v-model="giorno_selezionato">
          <option v-for="option in giorni" :value="option" :key="option">{{ option }}</option>
        </b-select>
      </b-field>
      <div v-if="current_json_list && oggi && picked && current_json_list.length > 0" style="text-align: left">
        <p class="title">Dati del {{giorno_selezionato}}</p>
        <p>Casi nuovi: {{oggi.casi_giornalieri}}</p>
        <p>Deceduti: {{oggi.deceduti }}</p>
        <p>Guariti: {{oggi.dimessi_guariti }}</p>
        <p>Ricoverati con sintomi: {{oggi.ricoverati_con_sintomi}}</p>
        <p>Ospedalizzati: {{oggi.totale_ospedalizzati}}</p>
        <p>Isolamento domiciliare: {{oggi.isolamento_domiciliare}}</p>
        <p>Attualmente positivi: {{oggi.totale_attualmente_positivi}}</p>
        <!-- <p>nuovi_attualmente_positivi: {{oggi.nuovi_attualmente_positivi}}</p>
        <p>dimessi_guariti: {{oggi.dimessi_guariti}}</p>
        <p>totale_casi: {{oggi.totale_casi}}</p>
        <p>tamponi: {{oggi.tamponi}}</p>-->
      </div>
      <!-- <p>Totale deceduti: {{current_json_list[0].deceduti }}</p> -->
    </div>
    <div class="column">
      <div class="">
        <line-chart v-if="picked" v-bind:chart-data="data_for_charts"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import createDataSet from "../utils.js";


export default {
  name: "Regioni",
  props: ["list_of_regioni", "json_regioni", "giorni"],
  components: {
    LineChart
  },
  data() {
    return {
      picked: null,
      oggi: null,
      current_json_list: null,
      data_for_charts: null,
      giorno_selezionato: null
    };
  },
  watch: {
    picked: function(val) {
      this.current_json_list = this.json_regioni[val]
      this.data_for_charts = createDataSet(this.current_json_list, ['deceduti', 'dimessi_guariti', 'terapia_intensiva', 'totale_casi'])
    },
    giorno_selezionato: function (val){
      this.oggi = this.current_json_list.filter(i => i.data.startsWith(val))[0]
    }
  },
//   beforeUpdate() {
//     this.current_json_list = this.json_regioni.filter(
//       d => d.denominazione_regione === this.picked
//     );
//     this.correctData(this.current_json_list);
//     this.data_for_charts = this.getDataSet();
//   },
  methods: {
    correctData(item) {
      item[0].casi_nuovi = 0;
      for (let index = 1; index < item.length; index++) {
        item[index].casi_nuovi =
          item[index].totale_casi - item[index - 1].totale_casi;
      }
    },
    getDataSet() {
      var obj = createDataSet(this.current_json_list, ['deceduti', 'dimessi_guariti', 'casi_nuovi'])
      console.log(obj)
      return obj
    },
  }
};
</script>