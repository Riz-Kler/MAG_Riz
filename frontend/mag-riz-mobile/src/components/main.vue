<script setup lang="ts">
import { ref } from "vue";
import Arrivals from "./Arrivals.vue";
import Departures from "./Departures.vue";
import Checkin from "./Checkin.vue";

type Screen = "home" | "arrivals" | "departures" | "checkin";

const current = ref<Screen>("home");

const goTo = (screen: Screen) => {
  current.value = screen;
};
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>MAG_Riz Flights</h1>
    </header>

    <main class="app-main">
        
      <!-- Home hub -->
      <section v-if="current === 'home'" class="home-grid">
  <button class="card arrivals" @click="goTo('arrivals')">
    <span class="title">Manchester Arrivals</span>
  </button>

  <button class="card departures" @click="goTo('departures')">
    <span class="title">Manchester Departures</span>
  </button>

  <button class="card checkin" @click="goTo('checkin')">
    <span class="title">Check-In Overview</span>
  </button>
</section>


      <!-- Detail screens -->
      <section v-else class="detail">
        <button class="back" @click="goTo('home')">← Back</button>

        <Arrivals v-if="current === 'arrivals'" />
        <Departures v-else-if="current === 'departures'" />
        <Checkin v-else-if="current === 'checkin'" />
      </section>
    </main>
  </div>
</template>

<style scoped>

.title {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #111;
  color: #f5f5f5;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.app-header {
  padding: 1rem 1.25rem;
  text-align: center;
  border-bottom: 1px solid #333;
}

.app-header h1 {
  font-size: 1.2rem;
  font-weight: 600;
}

.app-main {
  flex: 1;
  padding: 1.25rem;
}

.home-grid {
  display: grid;
  gap: 1rem;
}

.card {
  width: 100%;
  padding: 1.1rem 1.25rem;
  border-radius: 0.9rem;
  border: none;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: #1f1f1f;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.08s ease;
}

.card:active {
  transform: scale(0.98);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
}

.arrivals {
  border-left: 4px solid #4caf50;
}

.departures {
  border-left: 4px solid #ff9800;
}

.checkin {
  border-left: 4px solid #2196f3;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.back {
  align-self: flex-start;
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: none;
  background: #222;
  color: #f5f5f5;
  font-size: 0.9rem;
  cursor: pointer;
}
.card {
  background: linear-gradient(145deg, #1c1c1c, #111);
}


</style>
