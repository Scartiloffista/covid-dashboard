<template>
  <section class="section">
    <div class="container">
      <!--        {{dati_regioni_list}}-->
      <b-tabs v-model="activeTab">
        <b-tab-item label="Regioni">
            <Regioni v-bind:json_regioni="dati_regioni_list" v-bind:list_of_regioni="list_of_regioni" />
        </b-tab-item>

        <b-tab-item label="Riepilogo">
          <Chart v-if="dati_regioni_list" v-bind:dati_regioni_list="dati_regioni_list" />
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Chart from "./Chart.vue";
import Regioni from "./Regioni.vue"
export default Vue.extend({
  name: "Home",
  data () {
      return {
          activeTab: 1
      }
  },
  props: {
    dati_regioni_list: Array,
    list_of_regioni: Set
  },
  components: {
    Chart,
    Regioni
  }
});
</script>