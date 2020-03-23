<template>
  <div class="columns is-multiline">
      
    <div v-for="i of datasets" :value="i[0]" v-bind:key="i[0]" class=" column is-third small">
        {{ i[0] }}
        <line-chart v-bind:chart-data="i[1]" class="small"></line-chart>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import createDataSet from "../utils.js";
import LineChart from "./LineChart.vue"
export default Vue.extend({
  name: "Chart",
  components: {
      LineChart
  },
  props: {
    dati_regioni_list: Array,
    // required_fields: Array
  },
  data() {
    return {
      datasets: new Array(),
      required_fields: ["deceduti", "dimessi_guariti", "casi_nuovi", 'totale_casi']
    };
  },
  mounted() {
    this.dati_regioni_list.forEach(element => {
          this.datasets.push([element[0], createDataSet(element[1], this.required_fields)])
      });

    }
}
// watch: {
//     dati_regioni_list: function(val) {
//         val.forEach(element => {
//           this.datasets.push([element[0], createDataSet(element[1], this.required_fields)])
//       });

//     }
// }
//}
);
</script>


<style>
.small {
  max-width: 400px;
  /* margin:  150px auto; */
}
</style>
