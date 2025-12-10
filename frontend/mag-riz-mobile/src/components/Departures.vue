<script setup>
import { ref, onMounted } from "vue";
import { getDepartures } from "../services/flightService";

const flights = ref([]);

onMounted(async () => {
  flights.value = await getDepartures();
});
</script>

<template>
  <div class="screen">
    <h2>Departures</h2>

    <div v-for="f in flights" :key="f.id" class="flight-card">
      <strong>{{ f.callsign }}</strong>
      <p>MAN → {{ f.destination }}</p>
      <p>{{ f.scheduledTime }}</p>
      <span class="status">{{ f.status }}</span>
    </div>
  </div>
</template>
