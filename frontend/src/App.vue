<template>
  <main class="home">
    <section class="hero">
      <h1>Manchester Airport Flights</h1>
      <p>Live arrivals and departures from the MAG_Riz backend.</p>
    </section>

    <section class="actions">
      <router-link to="/arrivals" class="action-card">
        <h2>Arrivals</h2>
        <p>View inbound flights and latest status updates.</p>
      </router-link>

      <router-link to="/departures" class="action-card">
        <h2>Departures</h2>
        <p>Check outbound flights, gates and boarding status.</p>
      </router-link>
    </section>
  </main>
</template>
