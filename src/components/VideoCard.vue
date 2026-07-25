<template>
  <div class="card" :class="size">

    <div class="media">
      <video ref="video" :poster="thumbnail" playsinline controls preload="metadata" @play.once="loadVideo"></video>
    </div>

    <div class="footer">
      <div class="footeleft">
        <div class="title">{{ title }}</div>
        <div class="date">{{ date }}</div>
      </div>
        <a class="btn" :class="{ 'btn-disabled': isDisabled }" :href="isDisabled ? null : props.link" target="_blank" rel="noopener noreferrer">
        {{linktext}}
        </a>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue"
import Hls from "hls.js"

const isDisabled = computed(() => !props.link || platformtext.value === "unknown")

const props = defineProps({
  size: String,
  title: String,
  date: String,
  stream: String,
  link: String
})

const thumbCache = new Map()

const video = ref(null)
const thumbnail = ref("")
let hls = null
let isLoaded = false

function detectPlatform(url) {
  if (!url) return "unknown"

  const u = url.toLowerCase()

  if (u.includes("tiktok.com")) return "TikTok"
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "YouTube"
  if (u.includes("instagram.com")) return "Instagram"

  return "unknown"
}

function getYouTubeThumbnail(url) {
  try {
    const id =
      url.includes("youtu.be/")
        ? url.split("youtu.be/")[1]
        : new URL(url).searchParams.get("v")

    if (!id) return null
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  } catch {
    return null
  }
}

function getTikTokThumbnail(url) {
  const match = url.match(/video\/(\d+)/)
  if (!match) return null

  return `https://p16-sign-sg.tiktokcdn.com/obj/tos-maliva-p-0068/${match[1]}.jpg`
}

async function resolveThumbnail(url) {
  if (!url) return "/fallback-thumbnail.jpg"

  if (thumbCache.has(url)) {
    return thumbCache.get(url)
  }

  let result = null

  if (url.includes("youtube")) {
    result = getYouTubeThumbnail(url)
  }

  if (!result && url.includes("tiktok")) {
    result = getTikTokThumbnail(url)
  }

  thumbCache.set(url, result)
  return result
}

function loadVideo() {
  const el = video.value

  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(props.stream)
    hls.attachMedia(el)

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      el.play()
    })
  } else {
    el.src = props.stream
    el.play()
  }
}

function handlePlay() {
  loadVideo()
  video.value.play()
}

onMounted(async () => {
  thumbnail.value = await resolveThumbnail(props.link)
})

onBeforeUnmount(() => {
  if (hls) {
    hls.destroy()
  }
})

const platformtext = computed(() => detectPlatform(props.link))

const linktext = computed(() => {
  return platformtext.value === "unknown"
    ? "Vidéo indisponible"
    : "Regarder sur " + platformtext.value
})
</script>

<style scoped>
.card {
  background: #111;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: solid 1px #333;
  padding: 3px;
  border-radius: 20px;
  grid-column: span 1;
}

.media {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: black;
  border-radius: 17px;
}

.v9-16 video {
  object-fit: contain;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: inherit;
  border-radius: 17px;
}

.footer {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.footeleft{
  margin-right: 20px;
}

.title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 450;
}

.date {
  font-size: 12px;
  opacity: 0.6;
}

.btn {
	background: #000;
	color: white;
	border: none;
	padding: 9px 14px;
	text-decoration: none;
	min-width: max-content;
	transition: 0.5s cubic-bezier(.15,.65,0,1);
	will-change: transform;
	transform: translateZ(0px);
  border-radius: 10px;
  user-select: none;
}

.btn-disabled {
	opacity: 50%;
}

.btn:hover{
  scale: 1.03;
  transform: translateZ(0px);
}
</style>