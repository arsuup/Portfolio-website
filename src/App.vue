<template>
  <div class="layout">

    <aside class="sidebar">
      <img class="avatar" src="/i/pfp.png" alt="profile" />

      <h2 style="font-stretch: 120%;">Arsuup</h2>

      <!-- <p class="bio">
        <br>
      </p> -->

      <div class="links">
        <p class="biotx">Inspirations :</p>
        <a href="https://www.instagram.com/sameztwitch/" target="_blank" rel="noopener noreferrer">Sameztwitch</a>
        <a href="https://www.instagram.com/le__meunier/" target="_blank" rel="noopener noreferrer">Théo Meunier</a>
        <a href="https://www.youtube.com/@Laupok" target="_blank" rel="noopener noreferrer">Laupok</a>
      </div>

      <div class="softwares">
        <p class="biotx">Logiciels :</p> 
          <a>Adobe Premiere Pro</a>
          <a>Adobe After Effects</a>
          <a>Adobe Audition</a>
          <a style="background: #001e36; color: #31a8ff;">Adobe Photoshop</a>
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

<script setup>
import BentoGrid from "./components/BentoGrid.vue"
</script>

<style>
:root{
  --w: #F0F1F8;
  --b: #141517;
}

body {
  margin: 0;
  background: var(--b);
  color: var(--w);
  font-family: "Archivo", sans-serif;
}

::selection {
  background: var(--w);
  color: var(--b);
  text-shadow: none;
}
::-moz-selection {
  background: var(--w);
  color: var(--b);
  text-shadow: none;
}

.page {
  padding: 20px;
}

.layout {
  display: grid;
  grid-template-columns: 330px 1fr;
  min-height: 100vh;
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
  border: solid 1px #333;
}
#contact a {
  border-radius: 5px;
}
.softwares {
  display: flex;
  flex-direction: column;
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
.softwares a:hover {
  scale: 1.05;
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
    border-bottom: 1px solid #222;
}
}
</style>