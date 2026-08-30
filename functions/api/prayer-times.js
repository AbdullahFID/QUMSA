// functions/api/prayer-times.js

// Kingston, ON coordinates — Aladhan's city-name geocoding endpoint is unreliable
// (returns 503 "Geocoding is temporarily unavailable"), so we query by lat/long.
const LATITUDE  = 44.2312
const LONGITUDE = -76.4860
const TUNE      = '0,2,-2,1,0,1,0,1,0'

export async function onRequestGet() {
  // Today's date in Kingston's timezone (not UTC), in Aladhan's DD-MM-YYYY format
  const [year, month, day] = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
  })
    .format(new Date())
    .split('-')

  const url =
    `https://api.aladhan.com/v1/timings/${day}-${month}-${year}` +
    `?latitude=${LATITUDE}&longitude=${LONGITUDE}&method=2&tune=${TUNE}`

  const res = await fetch(url)
  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: 'Upstream fetch failed' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    )
  }
  const { data } = await res.json()

  // return with 24h CDN cache + 1h stale-while-revalidate
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type':  'application/json',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
