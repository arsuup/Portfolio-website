<script setup>
import { ref, onMounted } from "vue"
import BentoGrid from "@/components/BentoGrid.vue"
import { CDN_URL } from '@/utils/constants'

const softwarePr = ref(null)
const softwareAe = ref(null)
const softwareAu = ref(null)
const softwarePs = ref(null)

const links = {
  softwarePr: "https://www.adobe.com/fr/products/premiere.html",
  softwareAe: "https://www.adobe.com/fr/products/aftereffects.html",
  softwareAu: "https://www.adobe.com/fr/products/audition.html",
  softwarePs: "https://www.adobe.com/fr/products/photoshop.html",
}

onMounted(() => {
  const refs = { softwarePr, softwareAe, softwareAu, softwarePs }

  Object.entries(refs).forEach(([key, elRef]) => {
    elRef.value?.addEventListener('click', () => {
      window.open(links[key], '_blank', 'noopener,noreferrer')
    })
  })
})
</script>

<template>
  <div class="layout">

    <aside class="sidebar">
      <img class="avatar" :src="`${CDN_URL}/i/pfp.jpg`" alt=" " />

      <h2 style="font-stretch: 120%;">Arsuup</h2>

      <div class="links">
        <p class="biotx">Inspirations :</p>
        <a href="https://www.instagram.com/sameztwitch/" target="_blank" rel="noopener noreferrer">Sameztwitch</a>
        <a href="https://www.instagram.com/le__meunier/" target="_blank" rel="noopener noreferrer">Théo Meunier</a>
        <a href="https://www.youtube.com/@Laupok" target="_blank" rel="noopener noreferrer">Laupok</a>
      </div>

      <div class="softwares-container">
        <p class="biotx">Logiciels :</p>
        <div class="softwares">
          <a ref="softwarePr" title="Adobe Premiere Pro">Pr</a>
          <a ref="softwareAe" title="Adobe After Effects">Ae</a>
          <a ref="softwareAu" title="Adobe Audition">Au</a>
          <a ref="softwarePs" class="photoshop" title="Adobe Photoshop">Ps</a>
        </div>
      </div>

      <div class="links" id="contact">
        <p class="biotx">Me contacter :</p>
        <a href="https://l.arsuup.fr/mailprod" target="_blank" rel="noopener noreferrer">Mail : prod@arsuup.fr</a>
        <a href="https://l.arsuup.fr/insta" target="_blank" rel="noopener noreferrer">Insta : @arsuup_</a>
      </div>
    </aside>

    <main class="content">
      <BentoGrid />
    </main>

  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}

#app{
  display: flex;
  justify-content: center;
}

.layout {
  display: grid;
  grid-template-columns: 330px 1fr;
  max-width: var(--usercontent);
}
.sidebar {
  position: sticky;
  top: 0;
  padding: 24px;
  border-right: 1px solid #222;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.avatar {
  width: 100%;
  max-width: 60%;
  border-radius: 16px;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
}
.bio {
	line-height: 1.4;
	opacity: 0.7;
	margin-top: 0;
}
.biotx {
	margin: 0;
	margin-bottom: 10px;
	font-weight: 600;
  font-stretch: 125%;
}
.links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.links a {
	color: var(--w);
	opacity: 0.7;
	text-decoration: none;
	padding: 6px 10px;
	background: #0c0d0e;
	width: max-content;
  transition: 0.1s;
}
.links a:hover {
  opacity: 1;
}
#contact {
	padding: 10px;
	background: #181b1d;
	width: max-content;
	border-radius: 10px;
	padding-top: 12px;
  border: solid 1px var(--border2);
}
#contact a {
  border-radius: 5px;
}
.softwares-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.softwares {
  display: flex;
  gap: 6px;
}
.softwares a {
	color: #9999ff;
  font-weight: 800;
	padding: 6px 10px;
	background: #00005b;
	border-radius: 10px;
	width: max-content;
  transition: 0.1s;
  user-select: none;
}
.softwares .photoshop {
  background: #001e36;
  color: #31a8ff;
}
.softwares a:hover {
  scale: 1.1;
}
.content {
  padding: 20px;
}
@media (max-width: 900px) {
.layout {
    grid-template-columns: 1fr;
}
.sidebar {
    position: relative;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--border2);
}
}
</style>