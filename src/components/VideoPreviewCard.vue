<template>
  <div class="card" :class="size">
    <div class="media">
      <p>{{title}}</p>
      <video ref="video" loop></video>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import Hls from "hls.js"
import { loadHlsPrioritized } from "../utils/lazyqueue"

const props = defineProps({
  size: String,
  stream: String,
  title: String
})

const video = ref(null)

const siteReady = () => {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve()
    } else {
      window.addEventListener("load", resolve)
    }
  })
}

siteReady().then(() => {
  setTimeout(() => {
    hls.currentLevel = -1 // 👈 auto ABR activé
  }, 2000)
})

onMounted(() => {
  const el = video.value
  if (!el) return

  if (Hls.isSupported()) {
    loadHlsPrioritized(() => {
      return new Promise((resolve) => {
        const hls = new Hls({
          startLevel: 0,
          capLevelToPlayerSize: true,
          autoStartLoad: true,
          maxBufferLength: 6,
          maxMaxBufferLength: 12,
          maxLoadingDelay: 4,
          backBufferLength: 10,
          enableWorker: true
        })

        hls.loadSource(props.stream)
        hls.attachMedia(el)

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          el.muted = true
          el.playsInline = true

          el.play()
            .catch(() => {})
            .finally(() => {
              resolve()
            })
        })
      })
    })
  } else {
    el.src = props.stream
  }
})
</script>

<style scoped>
.card {
  background: #111;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  grid-column: span 1;
  border: solid 1px #333;
  padding: 3px;
  border-radius: 20px;
  grid-row: span 1;
}

.media {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: black;
  border-radius: 17px;
}

.v9-16 .media {
  aspect-ratio: 9 / 16;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 17px;
  aspect-ratio: 16/9;
}

p{
  position: absolute;
  margin: 10px;
  text-shadow: 2px 2px 6px #000000;
}
</style>