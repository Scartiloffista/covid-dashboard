<template>
  <div id="app">
    <Home v-bind:dati_regioni_list="dati_regioni_list" v-bind:list_of_regioni="list_of_regioni" />
  </div>
</template>

<script>
import axios from 'axios';
import Home from "./components/Home.vue";

export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      json_nazionale: null,
      list_of_province: null,
      list_of_regioni: null,
      dati_province_map: new Map(),
      dati_province_list: null,
      dati_regioni_map: new Map(),
      dati_regioni_list: null,
    };
  },
  methods : {
    correctData(item) {
      item[0].casi_nuovi = 0;
      for (let index = 1; index < item.length; index++) {
        item[index].casi_nuovi =
          item[index].totale_casi - item[index - 1].totale_casi;
      }
    }
  },
  mounted () {
    axios
      .get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
      )
      .then(response => (this.json_nazionale = response.data));

    axios
      .get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json"
      )
      .then(
        response => (
          (this.list_of_province = Array.from(
            new Set(response.data.map(i => i.denominazione_provincia))
          ).sort()),
          (this.list_of_province.forEach(element => {
            this.dati_province_map.set(
              element,
              response.data.filter(i => i.denominazione_provincia == element)
            );
          }),
          (this.dati_province_list = Array.from(this.dati_province_map))
          )))

    axios
      .get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json"
      )
      .then(
        response => (
          // (this.json_regioni = response.data),
          (this.list_of_regioni = new Set(
            response.data.map(i => i.denominazione_regione)
          )),
          (this.list_of_regioni.forEach(element => {
            var roba = response.data.filter(i => i.denominazione_regione == element)
            this.correctData(roba)
            this.dati_regioni_map.set(
              element,
              roba
            );
          })),
          (this.dati_regioni_list = Array.from(this.dati_regioni_map))),
        
      );
    axios
      .get(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json"
      )
      .then(
        response => (
          //(this.json_regioni = response.data),
          (this.totale_casi = response.data[0].totale_casi),
          (this.totale_deceduti = response.data[0].deceduti),
          (this.totale_guariti = response.data[0].dimessi_guariti),
          (this.totale_terapia_intensiva = response.data[0].terapia_intensiva)
        )
      );
    
  }










  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
