<template>
  <div>
    <h2>✈️ Manchester Arrivals</h2>
    <ul>
      <li v-for="flight in flights.arrivals" :key="flight[0]">
        {{ flight[1] }} from {{ flight[2] }}
      </li>
    </ul>

    <h2>🛫 Manchester Departures</h2>
    <ul>
      <li v-for="flight in flights.departures" :key="flight[0]">
        {{ flight[1] }} to {{ flight[2] }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getManchesterFlights } from "./services/flightService";

const flights = ref({ arrivals: [], departures: [] });

onMounted(async () => {
  flights.value = await getManchesterFlights();
});
</script>
