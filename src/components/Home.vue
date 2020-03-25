<template>
  <section class="section">
    <section class="info-tiles" id="counter">
      <div class="tile is-ancestor has-text-centered">
        <div class="tile is-parent">
          <article class="tile is-child notification is-primary">
            <p class="title">{{ totale_casi }}</p>
            <p class="subtitle">Casi totali</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-warning">
            <p class="title">{{ totale_terapia_intensiva}}</p>
            <p class="subtitle">Terapia Intensiva</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-danger">
            <p class="title">{{ totale_deceduti }}</p>
            <p class="subtitle">Deceduti</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <p class="title">{{ totale_guariti }}</p>
            <p class="subtitle">Guariti</p>
          </article>
        </div>
      </div>
    </section>
    <div class="container">
      <!--        {{dati_regioni_list}}-->
      <b-tabs v-model="activeTab">
        <b-tab-item label="Regioni">
          <Regioni v-if="dati" v-bind:json_regioni="dati" v-bind:list_of_regioni="list_of_regioni" />
        </b-tab-item>

        <b-tab-item label="Riepilogo">
          <Chart
            v-if="dati && activeTab == 1"
            v-bind:dati_regioni_list="dati"
            v-bind:required_fields="required_fields_riepilogo"
            nome="riepilogo"
          />
        </b-tab-item>

        <b-tab-item label="Andamento">
          <Chart
            v-if="dati && activeTab == 2"
            v-bind:dati_regioni_list="dati"
            v-bind:required_fields="required_fields_andamento"
            nome="andamento"
          />
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Chart from "./Chart.vue";
import Regioni from "./Regioni.vue";
export default Vue.extend({
  name: "Home",
  data() {
    return {
      activeTab: 0,
      dati: null,
      required_fields_riepilogo: ["deceduti", "dimessi_guariti", "totale_casi"],
      required_fields_andamento: ["casi_nuovi", "deceduti_giornalieri"],

      totale_casi: 0,
      totale_deceduti: 0,
      totale_guariti: 0,
      totale_terapia_intensiva: 0
    };
  },
  props: {
    dati_regioni_list: Array,
    list_of_regioni: Set,
    json_nazionale: Array,
    json_nazionale_latest: Array,

    json_regioni: Array
  },
  components: {
    Chart,
    Regioni
  },
  mounted() {
    var dati = new Object();
    this.json_regioni.forEach(element => {
      if (
        !Object.prototype.hasOwnProperty.call(
          dati,
          element.denominazione_regione
        )
      ) {
        dati[element.denominazione_regione] = [];
      }
      dati[element.denominazione_regione].push(element);
    });

    this.arricchisciDati(dati);
      this.dati = dati
    this.totale_casi = this.json_nazionale_latest[0].totale_casi;
    this.totale_deceduti = this.json_nazionale_latest[0].deceduti;
    this.totale_guariti = this.json_nazionale_latest[0].dimessi_guariti;
    this.totale_terapia_intensiva = this.json_nazionale_latest[0].terapia_intensiva;
  },
  methods: {
    arricchisciDati(dati) {
      for (const key in dati) {
        const element = dati[key];
        this.correctData(element);
      }
    },
    correctData(item) {
      item[0].casi_giornalieri = 0;
      item[0].deceduti_giornalieri = 0;
      for (let index = 1; index < item.length; index++) {
        item[index].casi_giornalieri =
          item[index].totale_casi - item[index - 1].totale_casi;
        item[index].deceduti_giornalieri =
          item[index].deceduti - item[index - 1].deceduti;
      }
    }
  }
});
</script>


<style>
.b-tabs {
  margin: 2rem auto
}
</style>