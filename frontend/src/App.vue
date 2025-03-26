<template>
  <div class="bg-black text-white min-h-screen w-screen font-mono p-4 relative">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl tracking-widest">Manchester Airport - {{ mode }}</h1>
      <div class="text-xl">{{ currentTime }}</div>
    </div>

    <div class="flex justify-center mb-4">
      <button
        @click="
          mode = 'Arrivals';
          fetchFlights();
        "
        class="mx-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
      >
        Arrivals
      </button>
      <button
        @click="
          mode = 'Departures';
          fetchFlights();
        "
        class="mx-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
      >
        Departures
      </button>
    </div>

    <table
      class="w-full text-lg table-fixed border-separate border-spacing-y-2"
    >
      <thead class="uppercase text-gray-400 text-left">
        <tr>
          <th>Airline</th>
          <th>Flight</th>
          <th>{{ mode === "Arrivals" ? "From" : "To" }}</th>
          <th>Scheduled</th>
          <th>Estimated</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="flight in flights"
          :key="flight.icao24"
          class="bg-gray-800 hover:bg-gray-700 transition-all"
        >
          <td>{{ flight.airline || "Unknown" }}</td>
          <td>{{ flight.callsign || "—" }}</td>
          <td>{{ flight.origin_country || "—" }}</td>
          <td>{{ formatTime(flight.scheduledTime) }}</td>
          <td>{{ formatTime(flight.estimatedTime) }}</td>
          <td :class="statusColor(flight.status)">
            {{ flight.status || "En Route" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const mode = ref("Arrivals");
const flights = ref([]);
const currentTime = ref(
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
);

const fetchFlights = async () => {
  try {
    const endpoint =
      mode.value === "Arrivals"
        ? "http://localhost:3000/api/flights/arrivals"
        : "http://localhost:3000/api/flights/departures";
    const res = await axios.get(endpoint);
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

const statusColor = (status) => {
  if (!status || status === "En Route") return "text-yellow-400";
  if (status === "Landed") return "text-green-400";
  if (status === "Cancelled" || status === "Delayed") return "text-red-500";
  return "";
};

onMounted(() => {
  fetchFlights();
  setInterval(fetchFlights, 30000);
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, 1000);
});
</script>

<style>
body {
  font-family: "Courier New", Courier, monospace;
  margin: 0;
  overflow-x: hidden;
}
</style>
