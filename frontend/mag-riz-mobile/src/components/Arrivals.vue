<script setup>
import { ref, onMounted } from "vue";
import { getArrivals } from "../services/flightService";

const flights = ref([]);

onMounted(async () => {
  flights.value = await getArrivals();
});
</script>

<template>
  <div class="screen">
    <h2>Arrivals</h2>

    <div v-for="f in flights" :key="f.id" class="flight-card">
      <strong>{{ f.callsign }}</strong>
      <p>{{ f.origin }} → MAN</p>
      <p>{{ f.scheduledTime }}</p>
      <span class="status">{{ f.status }}</span>
    </div>
  </div>
</template>

<style>
.screen { padding: 12px; }
.flight-card {
  background: white;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.status { color: #0077ff; font-weight: bold; }
</style>
