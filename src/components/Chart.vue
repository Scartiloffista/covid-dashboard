<template>
  <div class="columns is-multiline">
      
    <div v-for="i of datasets" v-bind:value="i[0]" v-bind:key="nome + i[0]" class=" column is-third">
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
    dati_regioni_list: Object,
    nome: String,
    required_fields: Array
  },
  data() {
    return {
      datasets: new Array(),
    };
  },
  mounted() {
    // this.dati_regioni_list.forEach(element => {
    //       this.datasets.push([element[0], createDataSet(element[1], this.required_fields)])
    //   });
    for (const key in this.dati_regioni_list) {
        console.log()
        this.datasets.push([key, createDataSet(this.dati_regioni_list[key], this.required_fields)])
        
    
    }
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
    margin:  auto;
  }
</style>
