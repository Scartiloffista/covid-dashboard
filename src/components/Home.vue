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
          <Regioni v-if="dati" v-bind:json_regioni="dati" v-bind:list_of_regioni="list_of_regioni" v-bind:giorni="giorni" />
        </b-tab-item>

        <b-tab-item label="Riepilogo">
          <Chart
            v-if="dati && activeTab == 1"
            v-bind:dati_regioni_list="dati"
            v-bind:required_fields="required_fields_riepilogo"
            v-bind:options_for_chart="options"
            nome="riepilogo"
          />
        </b-tab-item>

        <b-tab-item label="Andamento">
          <Chart
            v-if="dati && activeTab == 2"
            v-bind:dati_regioni_list="dati"
            v-bind:required_fields="required_fields_andamento"
            v-bind:options_for_chart="options_log"
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
      giorni: null,
      required_fields_riepilogo: [
        "deceduti",
        "dimessi_guariti",
        "totale_casi",
        "tamponi"
      ],
      required_fields_andamento: [
        "casi_giornalieri",
        "deceduti_giornalieri",
        "tamponi_giornalieri",
        "guariti_giornalieri"
      ],
      options_log: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                type: 'logarithmic'
            }]
        }
      },
      options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
            }]
        }
      },

        totale_casi: 0,
        totale_deceduti: 0,
        totale_guariti: 0,
        totale_terapia_intensiva: 0
    }
  
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
    this.giorni = new Set(this.json_regioni.map(i => i.data.split("T")[0]))
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
    this.dati = dati;
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
      item[0].tamponi_giornalieri = 0;
      item[0].guariti_giornalieri = 0;
      for (let index = 1; index < item.length; index++) {
        var oggi = item[index];
        var ieri = item[index - 1];
        oggi.casi_giornalieri = oggi.totale_casi - ieri.totale_casi;
        oggi.guariti_giornalieri = oggi.dimessi_guariti - ieri.dimessi_guariti;
        oggi.deceduti_giornalieri = oggi.deceduti - ieri.deceduti;
        oggi.tamponi_giornalieri = oggi.tamponi - ieri.tamponi;
        // if(oggi.tamponi_giornalieri < 0) oggi.tamponi_giornalieri = 0
        oggi.variazione_percentuale_casi =
          (oggi.totale_casi - ieri.totale_casi) / ieri.casi;
      }
    }
  }
});
</script>


<style>
.b-tabs {
  margin: 2rem auto;
}
</style>