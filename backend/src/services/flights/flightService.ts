import * as mock from "./mockFlightService";
import * as opensky from "./openSkyFlightService";

// Use OpenSky only when explicitly enabled
const useOpenSky = process.env.USE_OPENSKY === "true";
const impl = useOpenSky ? opensky : mock;

export const getArrivals = impl.getArrivals;
export const getDepartures = impl.getDepartures;
// export const getCheckInView = impl.getCheckInView;

// Normalised check-in view built from departures
export async function getCheckInView() {
  const departures = await impl.getDepartures();

  return departures.map(f => ({
    id: f.id,
    callsign: f.callsign,
    airline: f.airline,
    destination: f.destination,          // the tests expect this
    scheduledTime: f.scheduledTime,
    checkInDesk: (f as any).checkInDesk ?? "TBC",
    status: f.status,
  }));
}

