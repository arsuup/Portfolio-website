<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"
import Hls from "hls.js"
import { API_URL } from "@/utils/constants"
import ClientBadge from "@/components/ClientBadge.vue"

const route = useRoute()
const router = useRouter()

const video = ref(null)
const loading = ref(true)
const error = ref(null)

const videoEl = ref(null)
let hlsInstance = null

const videoId = computed(() => route.query.id)

async function fetchVideo(id) {
  if (!id) {
    error.value = new Error("Aucun identifiant de vidéo fourni.")
    return
  }

  try {
    const res = await fetch(`${API_URL}/videos/infos?id=${id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    if (!data) {
      error.value = new Error("Vidéo introuvable.")
      return
    }

    video.value = data
  } catch (err) {
    console.error("Erreur lors du chargement de la vidéo :", err)
    error.value = err
  }
}

function cleanupPlayer() {
  if (hlsInstance) {
    hlsInstance.detachMedia()
    hlsInstance.destroy()
    hlsInstance = null
  }

  if (videoEl.value) {
    videoEl.value.removeAttribute("src")
    videoEl.value.load()
  }
}

function setupPlayer() {
  const el = videoEl.value
  const link = video.value?.video_link

  if (!el || !link) return

  if (Hls.isSupported()) {
    hlsInstance = new Hls()
    hlsInstance.loadSource(link)
    hlsInstance.attachMedia(el)
  } else if (el.canPlayType("application/vnd.apple.mpegurl")) {
    el.src = link
  }
}

async function loadVideoAndPlayer(id) {
  loading.value = true
  error.value = null
  video.value = null

  cleanupPlayer()

  await fetchVideo(id)
  loading.value = false

  if (!video.value) return

  await nextTick()
  setupPlayer()
}

onMounted(() => {
  loadVideoAndPlayer(videoId.value)
})

watch(videoId, (newId) => {
  loadVideoAndPlayer(newId)
})

onUnmounted(() => {
  cleanupPlayer()
})

function goBack() {
  router.push("/")
}
</script>

<template>
  <div class="watch">
    <div v-if="loading" class="state">Chargement...</div>

    <div v-else-if="error" class="state">
      <p>{{ error.message }}</p>
      <button @click="goBack">Retour à l'accueil</button>
    </div>

    <div v-else-if="video" class="player-wrap">
      <video ref="videoEl" controls playsinline autoplay class="player"></video>
      <h1 class="title">{{ video.video_title }}</h1>
      <ClientBadge :client-id="video.client_id" />
    </div>
  </div>
</template>

<style scoped>
.watch {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 50vh;
  text-align: center;
}

.player-wrap {
  display: flex;
  flex-direction: column;
  gap: .7rem;
}

.player {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: black;
  border-radius: 18px;
  margin-bottom: .7rem;
}

.title {
  font-size: 1.2rem;
  margin: 0;
}
</style>