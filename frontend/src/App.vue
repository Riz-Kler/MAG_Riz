<template>
  <div class="bg-black text-white min-h-screen p-4 font-mono">
    <h1 class="text-3xl mb-4 text-center tracking-widest">
      Arrivals - Manchester Airport
    </h1>
    <table class="w-full text-lg table-fixed">
      <thead class="border-b border-gray-600 uppercase text-gray-400">
        <tr>
          <th class="w-1/6 text-left">Airline</th>
          <th class="w-1/6 text-left">Flight</th>
          <th class="w-1/4 text-left">From</th>
          <th class="w-1/6 text-left">Scheduled</th>
          <th class="w-1/6 text-left">Estimated</th>
          <th class="w-1/6 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="flight in flights"
          :key="flight.icao24"
          class="border-b border-gray-700"
        >
          <td>{{ flight.airline || "Unknown" }}</td>
          <td>{{ flight.callsign }}</td>
          <td>{{ flight.origin_country }}</td>
          <td>{{ formatTime(flight.scheduledTime) }}</td>
          <td>{{ formatTime(flight.estimatedTime) }}</td>
          <td>{{ flight.status || "En Route" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const flights = ref([]);

const fetchFlights = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/flights/arrivals"); // Update to match your backend
    flights.value = res.data;
  } catch (err) {
    console.error("Failed to load flights:", err);
  }
};

const formatTime = (timestamp) => {
  if (!timestamp) return "--:--";
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

onMounted(() => {
  fetchFlights();
  setInterval(fetchFlights, 30000); // Auto-refresh every 30s
});
</script>

<style>
body {
  font-family: "Courier New", Courier, monospace;
}
</style>
