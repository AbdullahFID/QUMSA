// functions/api/prayer‑times.js

export async function onRequestGet({ request }) {
  const today = new Date().toISOString().slice(0, 10)
  const tune  = '0,2,-2,1,0,1,0,1,0'
  const url   = `https://api.aladhan.com/v1/timingsByCity/${today}` +
                `?city=Kingston&country=Canada&method=2&tune=${tune}`

  // fetch upstream
  const res = await fetch(url)
  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: 'Upstream fetch failed' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    )
  }
  const { data } = await res.json()

  // return with 24h CDN cache + 1h stale‑while‑revalidate
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type':      'application/json',
      'Cache-Control':     'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
