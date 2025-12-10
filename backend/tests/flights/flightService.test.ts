import {
  getArrivals,
  getDepartures,
  getCheckInView
} from "../../src/services/flights/flightService";

describe("flightService (mock implementation)", () => {
  test("returns only arrivals", async () => {
    const arrivals = await getArrivals();
    expect(arrivals.every(f => f.direction === "arrival")).toBe(true);
    expect(arrivals.length).toBeGreaterThan(0);
  });

  test("returns only departures", async () => {
    const departures = await getDepartures();
    expect(departures.every(f => f.direction === "departure")).toBe(true);
    expect(departures.length).toBeGreaterThan(0);
  });

  test("check-in view comes from departures and has desk", async () => {
    const checkin = await getCheckInView();
    expect(checkin.length).toBeGreaterThan(0);

    for (const item of checkin) {
      expect(item.checkInDesk).toBeDefined();
      expect(item.destination).toBeDefined();
    }
  });
});
