<script setup>
import { onMounted, ref } from "vue"
import Hls from "hls.js"
import { loadHlsPrioritized } from "@/utils/lazyqueue"

const props = defineProps({
  size: String,
  stream: String,
  title: String
})

const video = ref(null)
const hls = ref(null)

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
    if (hls.value) {
      hls.value.currentLevel = -1
    }
  }, 2000)
})

onMounted(() => {
  const el = video.value
  if (!el) return

  if (Hls.isSupported()) {
    loadHlsPrioritized(() => {
      return new Promise((resolve) => {
        const instance = new Hls({
          startLevel: 0,
          capLevelToPlayerSize: true,
          autoStartLoad: true,
          maxBufferLength: 6,
          maxMaxBufferLength: 12,
          maxLoadingDelay: 4,
          backBufferLength: 10,
          enableWorker: true
        })

        hls.value = instance

        instance.loadSource(props.stream)
        instance.attachMedia(el)

        instance.on(Hls.Events.MANIFEST_PARSED, () => {
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

<template>
  <div class="card" :class="size">
    <div class="media">
      <p>{{title}}</p>
      <video ref="video" loop></video>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  grid-column: span 1;
  border: solid 1px var(--border2);
  padding: 3px;
  border-radius: 21px;
  grid-row: span 1;
  position: relative;
}

.media {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: black;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
}

.v9-16 video {
  object-fit: contain;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

p {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 10px;
  text-shadow: 2px 2px 6px black;
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>