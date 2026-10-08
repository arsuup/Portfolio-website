import { ref } from "vue"
import { API_URL } from "@/utils/constants"

const cache = new Map()

function fetchJson(url) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  })
}

export function useClientInfo(clientId, preset = {}) {
  if (cache.has(clientId)) return cache.get(clientId)

  const info = {
    clientName: ref(preset.name ?? null),
    clientLink: ref(preset.link ?? null),
    clientAvatar: `${API_URL}/clients/pfp?id=${encodeURIComponent(clientId)}`,
    status: ref(preset.name ? "ready" : "loading"),
  }
  cache.set(clientId, info)

  if (!clientId || preset.name) return info

  const id = encodeURIComponent(clientId)
  Promise.allSettled([
    fetchJson(`${API_URL}/clients/name?id=${id}`).then((r) => { info.clientName.value = r.username }),
    fetchJson(`${API_URL}/clients/link?id=${id}`).then((r) => { info.clientLink.value = r.redirect }),
  ]).then(([name]) => {
    info.status.value = name.status === "fulfilled" && info.clientName.value ? "ready" : "error"
    if (name.status === "rejected") console.warn("Nom du client indisponible :", clientId, name.reason)
  })

  return info
}