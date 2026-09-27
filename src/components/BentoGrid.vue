<script setup>
import { API_URL } from "@/utils/constants"
import { ref, onMounted, computed } from "vue"
import VideoCard from "./VideoCard.vue"
import VideoPreviewCard from "./VideoPreviewCard.vue"
import SectionDivider from "./SectionDivider.vue"

const typeConfig = {
  motion: { title: "Motion Design", component: VideoPreviewCard, },
  editing: { title: "Montage", component: VideoCard, },
  tiktok: { 
    title: "Tiktoks",
    component: VideoCard,
    gridStyle: {
      background: "#101013",
      borderRadius: "28px",
      outline: "5px solid #101013"
    },
  },
}

const videos = ref([])
const loading = ref(true)
const error = ref(null)

async function fetchVideos() {
  try {
    const res = await fetch(`${API_URL}/videos/list`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    videos.value = await res.json()
  } catch (err) {
    error.value = err
    console.error("Erreur lors du chargement des vidéos :", err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchVideos)

//TEMPORAIRE MAIS FLEMME DONC DÉFINITIF
const FR_MONTHS = {
  janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
}

function parseFrenchDate(str) {
  if (!str) return 0
  const match = str.match(/(\d{1,2})\s+(\S+)(?:\s+(\d{4}))?/i)
  if (!match) return 0
  const [, day, monthName, year] = match
  const month = FR_MONTHS[monthName.toLowerCase()]
  if (month === undefined) return 0
  const y = year ? Number(year) : new Date().getFullYear()
  return new Date(y, month, Number(day)).getTime()
}

function sortVideos(items) {
  return [...items].sort((a, b) => {
    const promoteDiff = Number(b.promote) - Number(a.promote)
    if (promoteDiff !== 0) return promoteDiff
    return parseFrenchDate(b.timestamp) - parseFrenchDate(a.timestamp)
  })
}

const sections = computed(() => {
  return Object.entries(typeConfig)
    .map(([type, config]) => ({
      type,
      title: config.title,
      component: config.component,
      gridStyle: config.gridStyle,
      items: sortVideos(videos.value.filter((v) => v.type === type)),
    }))
    .filter((section) => section.items.length > 0)
})
</script>

<template>
  <div v-if="loading">Chargement...</div>
  <div v-else-if="error">Erreur lors du chargement de la page.</div>

  <template v-else>
    <template v-for="section in sections" :key="section.type">
      <SectionDivider :title="section.title" />
      <div class="grid" :style="section.gridStyle">
        <component
          :is="section.component"
          v-for="video in section.items"
          :key="video.video_id"
          size="v16-9"
          :client_id="video.client_id"
          :timeline_link="video.timeline_link"
          :youtube_link="video.youtube_link"
          :video_title="video.video_title"
          :video_link="video.video_link"
          :stream="video.video_link"
          :title="video.video_title"
          :timestamp="video.timestamp"
          :promote="Boolean(Number(video.promote))"
        />
      </div>
    </template>
  </template>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 0 auto;
  margin-bottom: 20px;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>