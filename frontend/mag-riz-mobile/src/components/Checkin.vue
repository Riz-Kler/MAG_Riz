<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getAvailableReservations, createReservation } from "../services/checkinApi";

const FLIGHTS = ["MAN1001", "MAN1002", "MAN1003"];
const PASSENGERS = ["Riz Kler", "Alice Jones", "Eve Smith"];
const SEATS = ["Window", "Aisle", "Middle"];

const reservations = ref([]);
const loading = ref(false);
const error = ref<string | null>(null);
const message = ref<string | null>(null);

const flightId = ref("");
const passengerName = ref("");
const seat = ref("Window");

async function loadReservations() {
    try {
        error.value = null;
        const data = await getAvailableReservations();
        reservations.value = data;
    } catch (err: any) {
        error.value = err.message || "Failed to load reservations";
    }
}

onMounted(loadReservations);

// AVAILABLE PASSENGERS
const availablePassengers = computed(() => {
    return PASSENGERS.filter(
        (p) => !reservations.value.some((r: any) => r.passenger_name === p)
    );
});

// AVAILABLE SEATS FOR SELECTED FLIGHT
const availableSeatsForFlight = computed(() => {
    if (!flightId.value) return SEATS;

    return SEATS.filter(
        (s) => !reservations.value.some(
            (r: any) => r.flight_id === flightId.value && r.seat === s
        )
    );
});

// SUBMIT
async function handleSubmit() {
    message.value = null;
    error.value = null;

    if (!flightId.value || !passengerName.value || !seat.value) {
        error.value = "All fields are required.";
        return;
    }

    const payload = {
        passenger_name: passengerName.value,
        flight_id: flightId.value,
        seat: seat.value,
    };

    console.log("SENDING PAYLOAD:", payload); // DEBUG

    loading.value = true;

    try {
        const res = await createReservation(payload);
        message.value = "Check-in successful!";
        await loadReservations();
    } catch (err: any) {
        error.value = err.message || "Check-in failed";
    } finally {
        loading.value = false;
    }
}

</script>

<template>
  <div class="container">

    <h1>MAG Riz — Mobile Check-In</h1>

    <!-- Flight -->
    <label>Flight ID</label>
    <select v-model="flightId">
      <option disabled value="">Select a flight</option>
      <option v-for="f in FLIGHTS" :key="f">{{ f }}</option>
    </select>

    <!-- Passenger -->
    <label>Passenger Name</label>
    <select v-model="passengerName">
      <option disabled value="">Select a passenger</option>
      <option v-for="p in availablePassengers" :key="p">{{ p }}</option>
    </select>

    <!-- Seat -->
    <label>Seat Preference</label>
    <select v-model="seat">
      <option v-for="s in availableSeatsForFlight" :key="s">{{ s }}</option>
    </select>

    <button @click="handleSubmit" :disabled="loading">
      {{ loading ? "Checking In..." : "Check In" }}
    </button>

    <!-- SUCCESS -->
    <div v-if="message" class="success">{{ message }}</div>

    <!-- ERROR -->
    <div v-if="error" class="error">{{ error }}</div>

  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  padding: 30px;
  text-align: center;
  color: white;
}
select, button {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}
button {
  background: dodgerblue;
  color: white;
  font-weight: bold;
  border-radius: 6px;
}
.error {
  background: #660000;
  padding: 15px;
  margin-top: 10px;
  border-radius: 5px;
}
.success {
  background: #004d00;
  padding: 15px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>
