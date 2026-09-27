import { ref } from "vue"
import { API_URL } from "@/utils/constants"

const clientNameCache = new Map()
const clientLinkCache = new Map()

function getClientName(clientId) {
  if (clientNameCache.has(clientId)) {
    return clientNameCache.get(clientId)
  }

  const nameRef = ref(null)
  clientNameCache.set(clientId, nameRef)

  fetch(`${API_URL}/clients/name?client_id=${clientId}`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    })
    .then((result) => {
      nameRef.value = result.username
    })
    .catch((err) => {
      console.error("Erreur lors du chargement du nom du client :", err)
    })

  return nameRef
}

function getClientLink(clientId) {
  if (clientLinkCache.has(clientId)) {
    return clientLinkCache.get(clientId)
  }

  const linkRef = ref(null)
  clientLinkCache.set(clientId, linkRef)

  fetch(`${API_URL}/clients/link?client_id=${clientId}`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    })
    .then((result) => {
      linkRef.value = result.redirect
    })
    .catch((err) => {
      console.error("Erreur lors du chargement du lien du client :", err)
    })

  return linkRef
}

export function useClientInfo(clientId) {
  const clientName = getClientName(clientId)
  const clientLink = getClientLink(clientId)
  return { clientName, clientLink }
}