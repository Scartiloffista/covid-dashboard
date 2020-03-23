<template>
  <div class="columns">
    <div class="column is-one-third" id="selezione_regione">
      <!-- <b-field class="is-grouped is-grouped-centered"> -->
      <b-field class="is-grouped">
        <b-select placeholder="Seleziona una regione" v-model="picked">
          <option v-for="option in list_of_regioni" :value="option" :key="option">{{ option }}</option>
        </b-select>
      </b-field>
      <div v-if="current_json_list && current_json_list.length > 0" style="text-align: left">
        <p class="title">Dati di oggi:</p>
        <p>Casi nuovi: {{current_json_list[current_json_list.length -1].casi_nuovi}}</p>
        <p>Deceduti: {{current_json_list[current_json_list.length - 1].deceduti }}</p>
        <p>Guariti: {{current_json_list[current_json_list.length - 1].dimessi_guariti }}</p>
        <p>Ricoverati con sintomi: {{current_json_list[current_json_list.length -1].ricoverati_con_sintomi}}</p>
        <p>Ospedalizzati: {{current_json_list[current_json_list.length -1].totale_ospedalizzati}}</p>
        <p>Isolamento domiciliare: {{current_json_list[current_json_list.length -1].isolamento_domiciliare}}</p>
        <p>Attualmente positivi: {{current_json_list[current_json_list.length -1].totale_attualmente_positivi}}</p>
        <!-- <p>nuovi_attualmente_positivi: {{current_json_list[current_json_list.length -1].nuovi_attualmente_positivi}}</p>
        <p>dimessi_guariti: {{current_json_list[current_json_list.length -1].dimessi_guariti}}</p>
        <p>totale_casi: {{current_json_list[current_json_list.length -1].totale_casi}}</p>
        <p>tamponi: {{current_json_list[current_json_list.length -1].tamponi}}</p>-->
      </div>
      <!-- <p>Totale deceduti: {{current_json_list[0].deceduti }}</p> -->
    </div>
    <div class="column">
      <div class="small">
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
  props: ["list_of_regioni", "json_regioni"],
  components: {
    LineChart
  },
  data() {
    return {
      picked: null,
      current_json_list: null,
      data_for_charts: null
    };
  },

  watch: {
    picked: function() {
      this.current_json_list = this.json_regioni.filter(i => i[0] == this.picked)[0][1]
      this.data_for_charts = createDataSet(this.current_json_list, ['deceduti', 'dimessi_guariti', 'casi_nuovi', 'terapia_intensiva', 'totale_casi'])

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
      // return {
      //   labels: getDates(this.current_json_list),
      //   datasets: [
      //     {
      //       label: "Deceduti",
      //       borderColor: "red",
      //       fill: false,
      //       data: this.getInfo("deceduti")
      //     },
      //     {
      //       label: "Guariti",
      //       borderColor: "green",
      //       fill: false,
      //       data: this.getInfo("dimessi_guariti")
      //     },
      //     {
      //       label: "Casi Nuovi",
      //       borderColor: "orange",
      //       fill: false,
      //       data: this.getInfo("casi_nuovi")
      //     }
      //   ]
      // };
    },
  }
};
</script>

<style>
.small {
  max-width: 600px;
  /* margin:  150px auto; */
}
</style>
