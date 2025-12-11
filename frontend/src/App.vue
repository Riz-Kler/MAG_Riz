<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import {
  fetchArrivals,
  fetchDepartures,
  type Flight,
} from "./services/flightsApi";

const activeTab = ref<"arrivals" | "departures">("arrivals");
const flights = ref<Flight[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// Filters
const selectedAirline = ref<string>("all");
const selectedPlace = ref<string>("all");
const selectedDateFilter = ref<
  "all" | "today" | "christmas-eve" | "christmas-day" | "new-years-eve" | "new-years-day"
>("all");

async function loadFlights() {
  loading.value = true;
  error.value = null;

  try {
    if (activeTab.value === "arrivals") {
      flights.value = await fetchArrivals();
    } else {
      flights.value = await fetchDepartures();
    }

    // reset filters when switching tab / reloading
    selectedAirline.value = "all";
    selectedPlace.value = "all";
    selectedDateFilter.value = "all";
  } catch (e: any) {
    console.error("Error loading flights", e);
    error.value = e?.message ?? "Failed to load flights";
  } finally {
    loading.value = false;
  }
}

onMounted(loadFlights);
watch(activeTab, loadFlights);

const title = computed(() =>
  activeTab.value === "arrivals" ? "Arrivals" : "Departures",
);

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

function toDateKey(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function matchDateFilter(f: Flight): boolean {
  const key = toDateKey(f.scheduledTime);
  if (!key) return false;
  switch (selectedDateFilter.value) {
    case "all":
      return true;
    case "today": {
      const now = new Date();
      const todayKey = toDateKey(now.toISOString());
      return key === todayKey;
    }
    case "christmas-eve":
      return key.endsWith("-12-24");
    case "christmas-day":
      return key.endsWith("-12-25");
    case "new-years-eve":
      return key.endsWith("-12-31");
    case "new-years-day":
      return key.endsWith("-01-01");
    default:
      return true;
  }
}

const airlineOptions = computed(() => {
  const set = new Set<string>();
  for (const f of flights.value) set.add(f.airline);
  return Array.from(set).sort();
});

const placeOptions = computed(() => {
  const set = new Set<string>();
  for (const f of flights.value) {
    if (activeTab.value === "arrivals") {
      set.add(f.origin);
    } else {
      set.add(f.destination);
    }
  }
  return Array.from(set).sort();
});

const filteredFlights = computed(() => {
  return flights.value.filter((f) => {
    if (selectedAirline.value !== "all" && f.airline !== selectedAirline.value) {
      return false;
    }

    if (selectedPlace.value !== "all") {
      if (activeTab.value === "arrivals" && f.origin !== selectedPlace.value) {
        return false;
      }
      if (activeTab.value === "departures" && f.destination !== selectedPlace.value) {
        return false;
      }
    }

    if (!matchDateFilter(f)) return false;

    return true;
  });
});

function rowClass(f: Flight): string {
  const status = f.status.toLowerCase();
  if (status.includes("delayed")) return "status-delayed";
  if (status.includes("gate closing")) return "status-gate";
  if (status.includes("boarding")) return "status-boarding";
  if (status.includes("check-in open")) return "status-checkin";
  if (status.includes("final approach")) return "status-approach";
  if (status.includes("landed")) return "status-landed";
  if (status.includes("on time")) return "status-on-time";

  return "";
}

function isHolidayHighlight(f: Flight): boolean {
  const key = toDateKey(f.scheduledTime);
  return (
    key.endsWith("-12-24") || // Christmas Eve
    key.endsWith("-12-25") || // Christmas Day
    key.endsWith("-12-31") || // New Year’s Eve
    key.endsWith("-01-01")    // New Year’s Day
  );
}
</script>

<template>
  <div class="page">
    <div class="phone-shell">
      <header class="page-header">
        <div class="wreath">
          <span class="wreath-inner">🎄</span>
          <span class="wreath-bells">🔔🔔</span>
        </div>
        <div class="header-text">
          <h1>Manchester Airport Flights</h1>
          <p>Festive arrivals & departures from the MAG_Riz backend.</p>
        </div>
      </header>

      <div class="tab-bar">
        <button
          class="tab"
          :class="{ active: activeTab === 'arrivals' }"
          @click="activeTab = 'arrivals'"
        >
          Arrivals
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'departures' }"
          @click="activeTab = 'departures'"
        >
          Departures
        </button>
      </div>

      <!-- Filters -->
      <section class="filters-card">
        <div class="filters-row">
          <div class="filter">
            <label>Date</label>
            <select v-model="selectedDateFilter">
              <option value="all">All dates</option>
              <option value="today">Today</option>
              <option value="christmas-eve">Christmas Eve</option>
              <option value="christmas-day">Christmas Day</option>
              <option value="new-years-eve">New Year’s Eve</option>
              <option value="new-years-day">New Year’s Day</option>
            </select>
          </div>

          <div class="filter">
            <label>Airline</label>
            <select v-model="selectedAirline">
              <option value="all">All airlines</option>
              <option
                v-for="a in airlineOptions"
                :key="a"
                :value="a"
              >
                {{ a }}
              </option>
            </select>
          </div>

          <div class="filter">
            <label>{{ activeTab === "arrivals" ? "From" : "To" }}</label>
            <select v-model="selectedPlace">
              <option value="all">All</option>
              <option
                v-for="p in placeOptions"
                :key="p"
                :value="p"
              >
                {{ p }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="card-title">
          {{ title }}
          <span class="card-sub">
            Showing {{ filteredFlights.length }} flight<span v-if="filteredFlights.length !== 1">s</span>
          </span>
        </h2>

        <p v-if="loading" class="status">Loading flights…</p>
        <p v-else-if="error" class="status error">{{ error }}</p>
        <p v-else-if="filteredFlights.length === 0" class="status">
          No flights match the current filters.
        </p>

        <table v-else class="flight-table">
          <thead>
            <tr>
              <th>Time</th>
              <th v-if="activeTab === 'arrivals'">From</th>
              <th v-else>To</th>
              <th>Airline</th>
              <th>Flight</th>
              <th>Status</th>
              <th v-if="activeTab === 'departures'">Check-in</th>
              <th>🎁</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="f in filteredFlights"
              :key="f.id"
              :class="[rowClass(f), { holiday: isHolidayHighlight(f) }]"
            >
              <td>{{ formatTime(f.scheduledTime) }}</td>
              <td v-if="activeTab === 'arrivals'">{{ f.origin }}</td>
              <td v-else>{{ f.destination }}</td>
              <td>{{ f.airline }}</td>
              <td>{{ f.callsign }}</td>
              <td>{{ f.status }}</td>
              <td v-if="activeTab === 'departures'">
                {{ f.checkInDesk ?? "—" }}
              </td>
              <td>
                <span v-if="isHolidayHighlight(f)">🎄</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 16px;
  background:
    radial-gradient(circle at top, rgba(34, 197, 94, 0.25), transparent 55%),
    radial-gradient(circle at bottom, rgba(239, 68, 68, 0.25), transparent 55%),
    linear-gradient(135deg, #020617, #111827 45%, #020617);
  color: #e5e7eb;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

.phone-shell {
  width: 100%;
  max-width: 980px;
  border-radius: 32px;
  padding: 20px 16px 24px;
  background: radial-gradient(circle at top, #020617, #020617 40%, #020617);
  border: 2px solid rgba(148, 163, 184, 0.35);
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.8),
    0 0 0 8px rgba(15, 23, 42, 0.9);
  position: relative;
}

/* fake notch */
.phone-shell::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 16px;
  border-radius: 999px;
  background: #020617;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-top: 18px;
}

.wreath {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: radial-gradient(circle, #16a34a, #166534);
  border: 3px solid #facc15;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.9);
}

.wreath-inner {
  font-size: 1.4rem;
}

.wreath-bells {
  position: absolute;
  bottom: -10px;
  font-size: 0.9rem;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
}

.header-text h1 {
  font-size: 1.4rem;
  margin: 0 0 2px;
}

.header-text p {
  font-size: 0.85rem;
  margin: 0;
  color: #9ca3af;
}

.tab-bar {
  display: inline-flex;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.96);
  border: 1px solid #1f2937;
  padding: 4px;
  margin-bottom: 12px;
  gap: 4px;
}

.tab {
  padding: 6px 16px;
  border-radius: 999px;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;
  background: transparent;
  color: #9ca3af;
  transition: background 0.15s ease, color 0.15s ease, transform 0.05s ease;
}

.tab.active {
  background: linear-gradient(135deg, #22c55e, #ef4444);
  color: #f9fafb;
  transform: translateY(-1px);
}

.tab {
  padding: 6px 16px;
  border-radius: 999px;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;
  background: transparent;
  color: #9ca3af;
  transition: background 0.15s ease, color 0.15s ease, transform 0.05s ease;
}

.tab.active {
  background: linear-gradient(135deg, #22c55e, #ef4444);
  color: #f9fafb;
  transform: translateY(-1px);
}

.tab:hover:not(.active) {
  background: rgba(31, 41, 55, 0.9);
}


/* Filters */
.filters-card {
  background: radial-gradient(circle at top left, #0f172a, #020617);
  border-radius: 18px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  padding: 10px 12px;
  margin-bottom: 12px;
}

.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 130px;
  flex: 1;
}

.filter label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
}

.filter select {
  padding: 6px 8px;
  border-radius: 999px;
  border: 1px solid #374151;
  background: #020617;
  color: #e5e7eb;
  font-size: 0.85rem;
}

/* Card + table */
.card {
  background: rgba(15, 23, 42, 0.96);
  border-radius: 18px;
  padding: 14px 12px 16px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
  overflow-x: auto;
}

.card-title {
  font-size: 1.05rem;
  margin: 0 0 8px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.card-sub {
  font-size: 0.75rem;
  color: #9ca3af;
}

.status {
  font-size: 0.85rem;
  color: #9ca3af;
  padding: 6px 0;
}

.status.error {
  color: #fecaca;
}

.flight-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 6px;
  font-size: 0.85rem;
}

.flight-table th,
.flight-table td {
  padding: 6px 8px;
  text-align: left;
  border-bottom: 1px solid rgba(31, 41, 55, 0.8);
}

.flight-table th {
  font-weight: 600;
  color: #9ca3af;
}

.flight-table tr:last-child td {
  border-bottom: none;
}

/* Base hover */
.flight-table tr:hover {
  background: rgba(37, 99, 235, 0.12);
}

/* Status-based row colours */
.status-on-time {
  background: rgba(22, 163, 74, 0.12);
}

.status-delayed {
  background: rgba(220, 38, 38, 0.16);
}

.status-boarding {
  background: rgba(234, 179, 8, 0.16);
}

.status-checkin {
  background: rgba(59, 130, 246, 0.16);
}

.status-approach {
  background: rgba(96, 165, 250, 0.18);
}

.status-gate {
  background: rgba(251, 146, 60, 0.18);
}

.status-landed {
  background: rgba(148, 163, 184, 0.16);
}

/* Holiday highlight overlay */
.holiday {
  box-shadow: inset 2px 0 0 #f97316;
}

.holiday td:last-child {
  text-align: center;
}

/* Responsive tweaks */
@media (max-width: 640px) {
  .phone-shell {
    border-radius: 24px;
    padding: 16px 12px 18px;
  }

  .page-header {
    align-items: flex-start;
  }

  .filters-row {
    flex-direction: column;
  }
}
</style>
