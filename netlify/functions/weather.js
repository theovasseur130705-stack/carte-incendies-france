export default async () => {
  const api = 'https://api.open-meteo.com/v1/forecast?latitude=46.45&longitude=2.25&current=wind_speed_10m,wind_direction_10m,temperature_2m,relative_humidity_2m';
  try {
    const response = await fetch(api);
    if (!response.ok) return Response.json({ error: 'Erreur météo' }, { status: response.status });
    const data = await response.json();
    return Response.json(data, { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' } });
  } catch {
    return Response.json({ error: 'Service météo inaccessible' }, { status: 502 });
  }
};
