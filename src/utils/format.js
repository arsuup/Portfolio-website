// TIMESTAMPS

const FR_MONTHS = {
  janvier: 0, février: 1, fevrier: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, aout: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11, decembre: 11,
}

export function toTime(value) {
  if (value === null || value === undefined || value === '') return 0
  if (typeof value === 'number' || /^\d+$/.test(String(value).trim())) {
    const n = Number(value)
    return n < 1e12 ? n * 1000 : n
  }
  const str = String(value).trim()
  const iso = Date.parse(str)
  if (!Number.isNaN(iso) && /\d{4}-\d{2}-\d{2}/.test(str)) return iso

  const match = str.match(/(\d{1,2})\s+(\S+)(?:\s+(\d{4}))?/i)
  if (!match) return 0
  const [, day, monthName, year] = match
  const month = FR_MONTHS[monthName.toLowerCase()]
  if (month === undefined) return 0
  const y = year ? Number(year) : new Date().getFullYear()
  return new Date(y, month, Number(day)).getTime()
}

export function formatDate(value) {
  const t = toTime(value)
  if (!t) return typeof value === 'string' && !/^\d+$/.test(value) ? value : ''
  const d = new Date(t)
  const sameYear = d.getFullYear() === new Date().getFullYear()
  return d.toLocaleDateString('fr-FR', sameYear
    ? { day: 'numeric', month: 'long' }
    : { day: 'numeric', month: 'short', year: 'numeric' })
}

export function toISODate(value) {
  const t = toTime(value)
  return t ? new Date(t).toISOString().slice(0, 10) : undefined
}

// Plateformes / miniatures --------

export function detectPlatform(url) {
  if (!url) return null
  const u = url.toLowerCase()
  if (u.includes('tiktok.com')) return 'TikTok'
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'YouTube'
  if (u.includes('instagram.com')) return 'Instagram'
  return null
}

export function getYouTubeId(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0] || null
    if (u.searchParams.get('v')) return u.searchParams.get('v')
    const m = u.pathname.match(/\/(?:shorts|embed|live|v)\/([\w-]{6,})/)
    return m ? m[1] : null
  } catch {
    return null
  }
}

export function getYouTubeThumbnails(url) {
  const id = getYouTubeId(url)
  if (!id) return []
  return [
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hq720.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  ]
}

export function isHls(url) {
  return !!url && /\.m3u8(\?|$)/i.test(url)
}