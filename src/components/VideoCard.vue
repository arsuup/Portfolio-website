<script setup>
import { API_URL } from "@/utils/constants"
import { computed, onMounted, onBeforeUnmount, ref } from "vue"
import Hls from "hls.js"

const props = defineProps({
  size: String,
  client_id: String,
  timeline_link: String,
  youtube_link: String,
  video_title: String,
  video_link: String,
  timestamp: String,
  promote: Boolean
})

const isDisabled = computed(() => !props.youtube_link || platformtext.value === "unknown")

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
    hls.loadSource(props.video_link)
    hls.attachMedia(el)

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      el.play()
    })
  } else {
    el.src = props.video_link
    el.play()
  }
}

function handlePlay() {
  loadVideo()
  video.value.play()
}

onMounted(async () => {
  thumbnail.value = await resolveThumbnail(props.youtube_link)
})

onBeforeUnmount(() => {
  if (hls) {
    hls.destroy()
  }
})

const platformtext = computed(() => detectPlatform(props.youtube_link))

const linktext = computed(() => {
  return platformtext.value === "unknown"
    ? "Vidéo indisponible"
    : "Regarder sur " + platformtext.value
})

const isTimelineDisabled = !props.timeline_link

import { useClientInfo } from "@/utils/clientInfos"

const { clientName, clientLink } = useClientInfo(props.client_id)
</script>

<template>
  <div class="card" :class="'v' + size">

    <div class="media">
      <video ref="video" :poster="thumbnail" playsinline controls preload="metadata" @play.once="loadVideo"></video>
    </div>

    <div class="footer">
      <div class="topinfos">
        <a :href="clientLink" target="_blank" rel="noopener noreferrer">
          <div class="client">
            <img :src="API_URL + '/clients/pfp?client_id=' + client_id" alt="">
            <p>@{{ clientName }}</p>
          </div>
        </a>
        <div class="date">{{ timestamp }}</div>
      </div>

      <div class="videoinfos">
        <div class="title">{{ video_title }}</div>
      </div>

      <div class="cta">
        <a class="timelinebtn" :class="{ 'disabled': isTimelineDisabled }" :href="isTimelineDisabled ? undefined : timeline_link" target="_blank" rel="noopener noreferrer">Voir la timeline</a>
        <a class="btn" :class="{ 'btn-disabled': isDisabled }" :href="isDisabled ? null : props.youtube_link" target="_blank" rel="noopener noreferrer">
          {{linktext}}
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: solid 1px var(--border2);
  padding: 10px;
  border-radius: 28px;
  grid-column: span 1;
}

.media {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: black;
  border-radius: 18px;
  overflow: hidden;
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

.footer {
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: .7rem;
}

.topinfos{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client{
  display: flex;
  align-items: center;
  gap: .5rem;
  cursor: pointer;
}
.client img{
  height: 2rem;
  border-radius: 50%;
  user-select: none;
  pointer-events: none;
}
.client p{
  margin: 0;
  font-size: .95rem;
  font-stretch: 110%;
}
a {
  color: inherit;
  text-decoration: none;
}

.date{
  opacity: 33%;
  font-size: .95rem;
  font-weight: 300;
}

.cta{
  display: flex;
  justify-content: end;
  align-items: center;
  gap: .5rem;
}

.timelinebtn{
  color: var(--w);
  opacity: 33%;
  text-decoration: none;
  text-decoration-line: underline;
  text-decoration-thickness: 7%;
  text-underline-offset: 4%;
  text-underline-position: from-font;
}
.timelinebtn.disabled {
  pointer-events: none;
  cursor: default;
  display: none;
}

.btn{
  background: black;
  padding: .6rem .9rem;
  border-radius: 10px;
  display: flex;
  color: var(--w);
  text-decoration: none;
  transform: translateZ(0);
  transition: .5s cubic-bezier(.15,.65,0,1);
}
.btn:hover{
  transform: translateZ(0);
  transform: scale(1.05);
}
</style>