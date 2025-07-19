// functions/api/quran‑quotes.js

export async function onRequestGet({ request }) {
  const url = 'https://quranquotes.vercel.app/api/getAll'

  let quotes
  try {
    const res = await fetch(url)
    quotes    = res.ok ? await res.json() : null
  } catch {
    quotes = null
  }

  if (!quotes) {
    // fallback single quote
    quotes = [{
      quranQuote: "And We have certainly created man in the best of stature.",
      reference:  "Quran 95:4"
    }]
  }

  return new Response(JSON.stringify(quotes), {
    headers: {
      'Content-Type':      'application/json',
      'Cache-Control':     'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
