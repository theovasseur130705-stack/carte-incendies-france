export default async () => {
  try {
    const response = await fetch('https://api.airplanes.live/v2/point/46.45/2.25/250');
    if (!response.ok) return Response.json({ error: 'Erreur ADS-B' }, { status: response.status });
    const data = await response.json();
    const aircraft = (data.ac || []).filter(a => a.lat && a.lon).map(a => ({
      hex: a.hex, flight: (a.flight || '').trim(), type: a.t, registration: a.r, latitude: a.lat, longitude: a.lon, altitude: a.alt_baro, speed: a.gs, seen: a.seen
    }));
    return Response.json(aircraft, { headers: { 'Cache-Control': 'public, max-age=30, s-maxage=30' } });
  } catch {
    return Response.json({ error: 'Service ADS-B inaccessible' }, { status: 502 });
  }
};
