const bbox = [-5.8, 41.0, 9.8, 51.5];

function csvToJson(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const keys = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return Object.fromEntries(keys.map((key, i) => [key, values[i] ?? '']));
  });
}

export default async (request) => {
  const key = Netlify.env.get('FIRMS_MAP_KEY');
  if (!key) return Response.json({ error: 'FIRMS_MAP_KEY manquante dans Netlify' }, { status: 500 });
  const url = new URL(request.url);
  const days = Math.min(Math.max(Number(url.searchParams.get('days') || 2), 1), 5);
  const allowed = ['VIIRS_SNPP_NRT', 'VIIRS_NOAA20_NRT', 'MODIS_NRT'];
  const source = allowed.includes(url.searchParams.get('source')) ? url.searchParams.get('source') : 'VIIRS_SNPP_NRT';
  const firmsUrl = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${key}/${source}/${bbox.join(',')}/${days}`;
  try {
    const response = await fetch(firmsUrl, { headers: { 'User-Agent': 'Carte-Incendies-France/1.0' } });
    if (!response.ok) return Response.json({ error: 'Erreur NASA FIRMS', status: response.status }, { status: response.status });
    const fires = csvToJson(await response.text());
    return Response.json(fires, { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' } });
  } catch (error) {
    return Response.json({ error: 'Service FIRMS inaccessible' }, { status: 502 });
  }
};
